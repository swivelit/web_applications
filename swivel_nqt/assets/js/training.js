document.addEventListener("DOMContentLoaded", function () {

    const enquirySection = document.getElementById("enquirySection");
    const trainingSection = document.getElementById("trainingSection");

    // Check if student already enquired (saved in browser)
    const enrolled = localStorage.getItem("courseEnquired");

    if (enrolled === "yes") {
        trainingSection.classList.remove("d-none");
        enquirySection.classList.add("d-none");
    } else {
        enquirySection.classList.remove("d-none");
        trainingSection.classList.add("d-none");
    }

    // Handle enquiry form submit
    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (e) {
            e.preventDefault();

            localStorage.setItem("courseEnquired", "yes");

            alert("Enquiry submitted successfully!");

            enquirySection.classList.add("d-none");
            trainingSection.classList.remove("d-none");
        });
    }
});


// Logout function
function logout() {
    localStorage.removeItem("courseEnquired");
    window.location.href = "login.html"; // or reload if needed
}
