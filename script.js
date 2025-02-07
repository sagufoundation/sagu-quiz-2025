$(document).ready(function () {
    let data;
    let currentQuestion = 0;
    let score = 0;
    let jawabanTerisi = 0; // Tambahkan variabel jawabanTerisi

    function updateProgress() {
      let percentage = (jawabanTerisi / data.length) * 100; // Sesuaikan total soal
      document.getElementById("progressBar").style.width = percentage + "%";
      document
        .getElementById("progressBar")
        .setAttribute("aria-valuenow", percentage);
      document.getElementById("progressBar").innerText =
        Math.round(percentage) + "%"; // Menampilkan angka persentase
    }

    function loadQuestion() {
      const question = data[currentQuestion];
      $("#questionSection").html(`
    <div class="col-12">
        <p class="fw-bold mt-5">${question.question}</p>
    </div>
`);

      $("#questionSection").append('<div class="row"></div>');
      question.options.forEach((option, index) => {
        $("#questionSection .row").append(`
        <div class="col-md-6">
            <input type="radio" name="box" class="pilihan" id="option${index}" value="${option}">
            <label for="option${index}" class="box w-100">
                <div class="course">
                    <span class=""></span>
                    <span class="subject">${option}</span>
                </div>
            </label>
        </div>
    `);
      });

      $("#scoreSection").html(`
    <div class="col-10 m-4">
        <div class="p-4 bg-dark text-white rounded">
            Skor: <span>${score}</span>/50
        </div>
    </div>
`);

      $("#progresbar").html(`
    <div class="col-10 m-4 mx-auto text-center">
        <div class="progress">
            <div id="progressBar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                0%
            </div>
        </div>
    </div>
`);

      const buttonHtml =
        currentQuestion < data.length - 1
          ? `<button class="btn btn-primary px-5 py-1 fw-bold" id="next">Next</button>`
          : `<button class="btn btn-success px-5 py-2 fw-bold" id="finish">Finish</button>`;

      $("#buttonSection").html(`
    <div class="col-2 m-4">
        <div class="">
            ${buttonHtml}
        </div>
    </div>
`);

      // Event untuk update jawabanTerisi dan progress bar
      $("input[name=box]").change(function () {
        if (!$(this).data("answered")) {
          $(this).data("answered", true); // Tandai sebagai dijawab
        }

        $("label.box").removeClass("active");
        $(this).next("label.box").addClass("active");
      });
    }

    function checkAnswer() {
      const question = data[currentQuestion];
      const selectedOption = $("input[name=box]:checked").val();
      if (selectedOption === question.answer) {
        score += 1; // Increment score for correct answer
      }
    }

    $("#continue").click(function () {
      $("#intro1, #intro2").addClass("d-none");
      $("#biodata").removeClass("d-none");
      // loadQuestion();
    });
    $("#continue2").click(function () {
      const nameInput = $("#name").val();
      if (nameInput === null || nameInput === "") {
        var myModal = new bootstrap.Modal(
          document.getElementById("myModal2")
        );
        myModal.show();
        return;
      } else {
        $("#biodata").addClass("d-none");
        loadQuestion();
      }
    });

    $(document).on("click", "#next", function () {
      if (!$("input[name=box]:checked").val()) {
        $("#myModal3").modal("show");
        return;
      }
      checkAnswer();
      currentQuestion++;
      loadQuestion();
      jawabanTerisi++;
      updateProgress(); // Update progress bar
    });

    $(document).on("click", "#finish", function () {
      if (!$("input[name=box]:checked").val()) {
        $("#myModal3").modal("show");
        $("#myModal3").modal("show");
        return;
      }
      checkAnswer();
      jawabanTerisi++;
      updateProgress();
      $("#buttonSection, #scoreSection").html("");
      $("#survey").removeClass("d-none");
      $("#progresbar").addClass("d-none");
    });

    $(document).on("click", "#continue4", function () {
      // Biodata
      var name = $("#name").val();
      var hp = $("#hp").val();
      var address = $("#address").val();
      var agree = $("#flexCheckIndeterminate").is(":checked");

      // Survey (radio buttons) berdasarkan ID, dengan nilai default jika tidak ada pilihan
      var flexRadioDefault1 =
        $("input[name='flexRadioDefault1']:checked").val() ||
        "Tidak ada pilihan"; // Pertanyaan 1
      var flexRadioDefault2 =
        $("input[name='flexRadioDefault2']:checked").val() ||
        "Tidak ada pilihan"; // Pertanyaan 2
      var flexRadioDefault3 =
        $("input[name='flexRadioDefault3']:checked").val() ||
        "Tidak ada pilihan"; // Pertanyaan 3
      var flexRadioDefault4 =
        $("input[name='flexRadioDefault4']:checked").val() ||
        "Tidak ada pilihan"; // Pertanyaan 4

      // Survey text input
      var survey5 = $("#survey5").val() || "Tidak ada input"; // Pertanyaan 5
      var survey6 = $("#survey6").val() || "Tidak ada input"; // Pertanyaan 6

      // Cek jika ada input yang kosong atau null
      if (
        !flexRadioDefault1 === "Tidak ada pilihan" ||
        flexRadioDefault2 === "Tidak ada pilihan" ||
        flexRadioDefault3 === "Tidak ada pilihan" ||
        flexRadioDefault4 === "Tidak ada pilihan" ||
        survey5 === "Tidak ada input" ||
        survey6 === "Tidak ada input"
      ) {
        var myModal = new bootstrap.Modal(
          document.getElementById("myModal2")
        );
        myModal.show();
        return; // Tidak melanjutkan proses jika ada field yang kosong atau tidak valid
      } else {
        $("#survey").addClass("d-none");
        if (score <= 20) {
          $("#questionSection").html(`
                <div class="col-12 text-center">
                    <p class="fw-bold">Quiz completed. Your score is ${score}/50</p>
                    <p> <span class="fw-bold"> Beginner </span> (A1) - Basic understanding of very simple grammar and vocabulary </p>
                </div>
                `);
        }

        if (score >= 21 && score <= 30) {
          $("#questionSection").html(`
                <div class="col-12 text-center">
                    <p class="fw-bold">Quiz completed. Your score is ${score}/50</p>
                    <p> <span class="fw-bold"> Elementary  </span> (A2) - Familiar with simple structures and everyday vocabulary
                    </p>
                </div>
                `);
        }

        if (score >= 31 && score <= 40) {
          $("#questionSection").html(`
                <div class="col-12 text-center">
                    <p class="fw-bold">Quiz completed. Your score is ${score}/50</p>
                    <p> <span class="fw-bold"> Intermediate   </span> (B1) -  Good grasp of basic grammar and vocabulary with some range
                    </p>
                </div>
                `);
        }

        if (score >= 41 && score <= 50) {
          $("#questionSection").html(`
                <div class="col-12 text-center">
                    <p class="fw-bold">Quiz completed. Your score is ${score}/50</p>
                    <p> <span class="fw-bold"> Intermediate   </span> (C1) -  Solid use of more complex grammar and varied vocabulary.
                    </p>
                </div>
                `);
        }

        $("#buttonSection").html("");
        $("#scoreSection").html("");

        var script_url =
          "https://script.google.com/macros/s/AKfycbxxxTtF17qFs-4poIVdyc_HjmSd_0sKMXmMMDR1hmwCLonOrA94bcAu0ikcNtg7xxBr/exec";
        var url =
          script_url +
          "?callback=ctrlq&name=" +
          encodeURIComponent(name) +
          "&hp=" +
          encodeURIComponent(hp) +
          "&address=" +
          encodeURIComponent(address) +
          "&agree=" +
          agree +
          "&flexRadioDefault1=" +
          encodeURIComponent(flexRadioDefault1) +
          "&flexRadioDefault2=" +
          encodeURIComponent(flexRadioDefault2) +
          "&flexRadioDefault3=" +
          encodeURIComponent(flexRadioDefault3) +
          "&flexRadioDefault4=" +
          encodeURIComponent(flexRadioDefault4) +
          "&survey5=" +
          encodeURIComponent(survey5) +
          "&survey6=" +
          encodeURIComponent(survey6) +
          "&score=" +
          encodeURIComponent(score) +
          "&action=insert";

        // Clear form fields
        $("input[type='text']").val("");
        $("textarea").val("");

        // Kirim request ke URL
        var request = jQuery.ajax({
          crossDomain: true,
          url: url,
          method: "GET",
          dataType: "jsonp",
        });
      }
    });

    $.getJSON("data.json", function (response) {
      data = response;
    });
  });