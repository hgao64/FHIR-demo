// Create a FHIR client (server URL, patient id in `demo`)
var smart = FHIR.client(demo),
    pt = smart.context.patient;

// Create a patient banner by fetching + rendering demographics
pt.read()
    .then(function(p) {
        var name = p.name[0];
        var formatted = name.given.join(" ") + " " + name.family;
        $("#patient_name").text(formatted);
    });

// A more advanced query: search for active Prescriptions, including med details
pt.MedicationPrescription.where
    .status("active")
    ._include("MedicationPrescription.medication")
    .search()
    .then(function(prescriptions) {
        prescriptions.forEach(function(rx) {
            var med = smart.cachedLink(rx, rx.medication);
            var row = $("<li> " + med.name + "</li>");
            $("#med_list").append(row);
        });
    });