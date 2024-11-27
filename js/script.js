$(document).ready(function() {
  // Initialize jQuery Validation
  $("#rangeForm").validate({
      rules: {
          startRow: {
              required: true,
              min: -50,
              max: 50
          },
          endRow: {
              required: true,
              min: -50,
              max: 50,
              greaterThanStart: true  // Custom rule for endRow
          },
          startCol: {
              required: true,
              min: -50,
              max: 50
          },
          endCol: {
              required: true,
              min: -50,
              max: 50,
              greaterThanStart: true  // Custom rule for endCol
          }
      },
      messages: {
          startRow: {
              required: "Please enter a starting row.",
              min: "Start row must be between -50 and 50.",
              max: "Start row must be between -50 and 50."
          },
          endRow: {
              required: "Please enter an ending row.",
              min: "End row must be between -50 and 50.",
              max: "End row must be between -50 and 50.",
              greaterThanStart: "End row must be greater than or equal to start row."
          },
          startCol: {
              required: "Please enter a starting column.",
              min: "Start column must be between -50 and 50.",
              max: "Start column must be between -50 and 50."
          },
          endCol: {
              required: "Please enter an ending column.",
              min: "End column must be between -50 and 50.",
              max: "End column must be between -50 and 50.",
              greaterThanStart: "End column must be greater than or equal to start column."
          }
      },
      submitHandler: function(form) {
          // Generate table if form is valid
          generateTable();
      }
  });

  // Custom validation method to check if end value is greater than or equal to start value
  $.validator.addMethod("greaterThanStart", function(value, element) {
      var startValue = $(element).siblings('input[name^="start"]').val();
      return parseInt(value) >= parseInt(startValue);
  }, "End value must be greater than or equal to start value.");

  function generateTable() {
      // Get form input values
      var startRow = parseInt($("#startRow").val());
      var endRow = parseInt($("#endRow").val());
      var startCol = parseInt($("#startCol").val());
      var endCol = parseInt($("#endCol").val());

      // Clear existing table if any
      $("#multTable").empty();

      // Create table header
      var table = $("#multTable");
      var headerRow = $("<tr></tr>");
      headerRow.append("<th></th>");
      for (var col = startCol; col <= endCol; col++) {
          headerRow.append("<th>" + col + "</th>");
      }
      table.append(headerRow);

      // Create table rows
      for (var row = startRow; row <= endRow; row++) {
          var tableRow = $("<tr></tr>");
          tableRow.append("<th>" + row + "</th>");

          for (var col = startCol; col <= endCol; col++) {
              tableRow.append("<td>" + (row * col) + "</td>");
          }

          table.append(tableRow);
      }

      // Show the table
      table.show();
  }
});
