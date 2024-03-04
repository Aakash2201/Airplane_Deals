var data;
var destination_state = "BOM";
var origin_state = "DEL";

function submit() {

    var temp_source_id = document.getElementById("temp_source").value;
    var temp_destination_id = document.getElementById("temp_destination").value;

    origin_state = temp_source_id;
    destination_state = temp_destination_id;

    var options = {
        method: 'GET',
        url: 'https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/',
        params: {
            destination: destination_state,
            origin: origin_state,
            return_date: "2024-04",
            depart_date: "2024-03"
        },
        headers: {
            'X-Access-Token': '85741e7b7e34bb7e025f03a2fc23abb9',
            'X-RapidAPI-Key': 'e72cccb845msh30d8841f5213b3ap1b1483jsncf01b99b4416',
            'X-RapidAPI-Host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com'
        }
    };

    axios.request(options)
        .then(function(response) {
            console.log("Keys in data object:");
            Object.keys(response.data).forEach(function(key) {
                console.log(key);
            });

            var data = response.data.data;
            console.log(data);

            var Json_data = JSON.parse(JSON.stringify(data[destination_state]));
            console.log(Json_data[0]);

            var airline_name = Json_data[0]["airline"];
            var current_price = Json_data[0]["price"];
            var flight_number = Json_data[0]["flight_number"];
            var departure_at = Json_data[0]["departure_at"];
            var return_at = Json_data[0]["return_at"];

            console.log(airline_name + "\n" + current_price + "\n" + flight_number + "\n" + departure_at + "\n" + return_at);


            var outputDetails = document.getElementById("output_details");
            outputDetails.innerHTML = `
          <p>Airline: ${airline_name}</p>
          <p>Price: ${current_price}</p>
          <p>Flight Number: ${flight_number}</p>
          <p>Departure Time: ${departure_at}</p>
          <p>Return Time: ${return_at}</p>
      `;

            document.getElementById("output_destination_tab").innerText = origin_state + "  < >  " + destination_state;

            document.getElementById("output_tab").style.display = "block";


        })
        .catch(function(error) {
            console.error(error);
        });

}
