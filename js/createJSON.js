/**
 * Created by yesin on 1/20/17.
 */
//JSON obj array
var markerInfo = {
    // metaData: []
};

//console.log(baseMap);

$('form').validate({
    // Specify the validation rules
    rules: {
        locationName: {
            required: true
            , minlength: 3
        }
        , address: {
            required: true
        }
        , floors: {
            required: true,
            min: 1
        }
        , agree: "required"
    }, // Specify the validation error messages
    messages: {
        locationName: {
            reuired: "Please enter the location name"
            , minlength: "Location name should be more than 3 characters"
        }
        , address: {
            required: "Please enter your address"
        }
        , floors: {
            required: "Please provide floor number",
            min:"Please enter a value greater than 0"
        }
    }
});

$('#home').on('click', '[data-toggle=update-data]', function(e){

    if($(e.target).closest('form').valid()) {

        var markerDetails = {};
        var coordinates = {};
        var element = $(e.target).closest('.item');

        //passing the lat and lng values to coordinates obj
        coordinates["lat"] = element.data('lat');
        coordinates["lng"] = element.data('lng');

        //get the values of the form elements
        var id = element.prop('id');


        //obj array to be inside markerInfo obj array
        var floorplan = [];
        var floorObjs = {};
        floorObjs["floor1"] = "";
        floorplan.push(floorObjs);

        //get the values of the form elements
        var markerId = element.prop('id');

        var name = element.find('[name=locationName]').val();
        var address = element.find('[name=address]').val();
        var floors = element.find('[name=floors]').val();

        $('#heading'+id).find('.panel-title').text(name);

        //prepare the properties of the object
        markerDetails["id"] = markerId;
        markerDetails["address"] = address;
        markerDetails["coordinates"] = coordinates;
        markerDetails["floorplan"] = floorplan;
        markerDetails["floors"] = floors;
        markerDetails["locationName"] = name;

        //After you've done fiddling with the object you can pass the object into the JSON array
        // markerInfo.metaData.push(markerDetails);

        //object is created to be pushed to result JSON
        console.log(markerDetails);


        //get the JSON obj array
            $.get('result.json', function (data) {

                var popupContent = '<h4>'+ name +'</h4>' +
                    '<button type="button" class="btn btn-secondary" data-toggle="edit-floors">Edit Floors</button>' +
                    '<ul>' +
                    '<li>No of Floors: '+ floors+' </li>' +
                    '<li> Address: '+ address+'</li>' +
                    '</ul>';

               var popup = L.popup({
                    autoPan: true,
                    keepInView: true})
                    .setContent(popupContent);


            var markerObj =  markers[markerId];
                markerObj.unbindPopup();
                markerObj.bindPopup(popup);


                // markers[markerId]._popup._content = popupContent;
                // console.log( markers[markerId]._popup._content);
                data.metaData.push(markerDetails);
                console.log(data);


            });

        // markers[markerId]._popup._content

        // //update popup
        // $.get('result.json', function (data) {
        //     $.each(data.metaData, function(i, n){
        //         if(n.id = markerId){
        //
        //             // baseMap.removeLayer(markers[$(this).attr('id')]);
        //             //
        //             // var idNo = $(this).attr('id');
        //             // // Remove the link
        //             // $(this).parent('div').remove();
        //             //
        //             // $('#home').find('#' + idNo).remove();
        //             // console.log(markers);
        //             //     markers.splice(idNo,1);
        //             //
        //
        //
        //             // addingMarker(null, n[i]);
        //         }
        //     });
        // });
    }

});