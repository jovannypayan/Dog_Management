import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, jsonify
import mysql.connector
from functions import get_dog_stats  # Ensure this function is defined to get stats
from flask import Flask, jsonify, request
from functions import insert_dog
from functions import (connect_to_db, print_medical_history, insert_medical_procedure, insert_vaccine, 
                          update_medical_records, delete_medical_procedure, delete_vaccine)

app = Flask(__name__)   

# Database connection setup
def connect_to_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Guarita12!",  # Update this with your actual MySQL password
        database="dog_management"
    )

# Define the API route to fetch dog stats
@app.route('/api/dog-stats', methods=['GET'])
def dog_stats():
    # Connect to the database
    db = connect_to_db()
    cursor = db.cursor()

    try:
        # Fetch stats like total dogs, adopted dogs, available dogs
        cursor.execute("SELECT COUNT(*) FROM dogs")
        total_dogs = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM dogs WHERE status = 'adopted'")
        adopted_dogs = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM dogs WHERE status = 'available'")
        available_dogs = cursor.fetchone()[0]

        # Return the stats as a JSON response
        stats = {
            "totalDogs": total_dogs,
            "adoptedDogs": adopted_dogs,
            "availableDogs": available_dogs
        }

        return jsonify(stats)
    
    except mysql.connector.Error as err:
        return jsonify({"error": f"Database error: {err}"}), 500
    
    finally:
        cursor.close()
        db.close()

# Route to fetch the list of dogs
@app.route('/api/dogs', methods=['GET'])
def get_dogs():
    db = connect_to_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT dogID, name, breed, age, adoptabilityScore, arrivalDate, spayedNeuturedStatus, sex FROM Dog")
    dogs = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(dogs), 200

# Route to insert a new dog into the database
@app.route('/api/dogs', methods=['POST'])
def add_dog():
    data = request.get_json()
    staff_id = data.get('staffID')
    name = data.get('name')
    breed = data.get('breed')
    age = data.get('age')
    adoptability_score = data.get('adoptabilityScore')
    arrival_date = data.get('arrivalDate')
    spayed_neutered = data.get('spayedNeuteredStatus')
    sex = data.get('sex')
    initial_status = data.get('initialStatus')
    kennel_no = data.get('kennelNo', None)
    date_start_availability = data.get('dateStartAvailability', None)
    main_image_url = data.get('mainImageUrl', None)
    extra_image_urls = data.get('extraImageUrls', None)

    # Call the function to insert the dog
    insert_dog(staff_id, name, breed, age, arrival_date, spayed_neutered, adoptability_score, sex, initial_status, kennel_no, date_start_availability, main_image_url, extra_image_urls)

    return jsonify({"message": "Dog inserted successfully"}), 201


@app.route('/api/dog_details/<int:dog_id>', methods=['GET'])
def get_dog_details(dog_id):
    db = connect_to_db()
    cursor = db.cursor(dictionary=True)

    # Get Dog details along with its shelter
    dog_query = """
    SELECT d.dogID, d.name, d.breed, d.sex, d.age, d.adoptabilityScore, 
           d.arrivalDate, d.spayedNeuteredStatus, s.shelterID, s.phoneNumber, s.address, s.name AS shelter_name
    FROM Dog d
    JOIN Shelter s ON s.shelterID = d.shelterID
    WHERE d.dogID = %s
    """
    cursor.execute(dog_query, (dog_id,))
    dog_details = cursor.fetchone()

    # Get the most recent adoption status, including adopter if available
    status_query = """
    SELECT sr.recordDate, adp.adoptionType, a.name AS adopter_name, a.phoneNumber AS adopter_phone, 
           a.address AS adopter_address
    FROM Status_Record sr
    LEFT JOIN Adoption_Record adp ON sr.recordID = adp.recordID
    LEFT JOIN Adopter a ON adp.adopter_ssn = a.SSN
    WHERE sr.dogID = %s
    ORDER BY sr.recordDate DESC LIMIT 1
    """
    cursor.execute(status_query, (dog_id,))
    adoption_details = cursor.fetchone()

    cursor.close()
    db.close()

    # Combine both dog and adoption details
    if dog_details:
        dog_details['adoption'] = adoption_details if adoption_details else None
        return jsonify(dog_details), 200
    else:
        return jsonify({'message': 'Dog not found'}), 404


@app.route('/api/medical-history/<int:dog_id>', methods=['GET'])
def get_medical_history(dog_id):
    try:
        db = connect_to_db()
        cursor = db.cursor(dictionary=True)

        # Retrieve medical history
        query = """
        SELECT d.spayedNeuturedStatus, v.vaccineType, v.vaccineDate, 
               mp.typeOfProcedure, mp.procedureDate
        FROM Dog d
        LEFT JOIN Vaccine v ON d.dogID = v.dogID
        LEFT JOIN Medical_Procedure mp ON d.dogID = mp.dogID
        WHERE d.dogID = %s
        """
        cursor.execute(query, (dog_id,))
        records = cursor.fetchall()
        cursor.close()
        db.close()
        return jsonify(records), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/medical-procedure', methods=['POST'])
def add_medical_procedure():
    data = request.json
    dog_id = data.get('dogID')
    procedure_date = data.get('procedureDate')
    type_of_procedure = data.get('typeOfProcedure')
    try:
        insert_medical_procedure(dog_id, procedure_date, type_of_procedure)
        return jsonify({"message": "Medical procedure added successfully"}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vaccine', methods=['POST'])
def add_vaccine():
    data = request.json
    dog_id = data.get('dogID')
    vaccine_type = data.get('vaccineType')
    vaccine_date = data.get('vaccineDate')
    try:
        insert_vaccine(dog_id, vaccine_type, vaccine_date)
        return jsonify({"message": "Vaccine added successfully"}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/medical-procedure/<int:procedure_id>', methods=['DELETE'])
def remove_medical_procedure(procedure_id):
    try:
        delete_medical_procedure(procedure_id)
        return jsonify({"message": "Medical procedure deleted successfully"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vaccine/<int:vaccine_id>', methods=['DELETE'])
def remove_vaccine(vaccine_id):
    try:
        delete_vaccine(vaccine_id)
        return jsonify({"message": "Vaccine deleted successfully"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def search_dogs():
    query = request.args.get('query', '')  # Get the search query from the query string

    db = connect_to_db()
    cursor = db.cursor(dictionary=True)

    # SQL query to search in multiple fields (dog's name, breed, age, etc.)
    search_query = """
    SELECT d.dogID, d.name, d.breed, d.age, d.adoptabilityScore, d.arrivalDate, d.spayedNeuteredStatus, d.sex
    FROM Dog d
    WHERE d.name LIKE %s OR d.breed LIKE %s OR d.age LIKE %s
    """
    cursor.execute(search_query, (f"%{query}%", f"%{query}%", f"%{query}%"))
    dogs = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(dogs)

if __name__ == '__main__':
    app.run(debug=True)
