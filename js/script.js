$("#sendOtpLink").on("click", function () {
    var emailInput = $("#email").val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the entered email is valid
    if (!emailRegex.test(emailInput)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address",
        });

        return;
    }
    // Disable the link to prevent multiple clicks
    var sendOtpLink = $("#sendOtpLink");
    sendOtpLink.css("pointer-events", "none");
    $("#email").prop("disabled", true);
    $("#loadingOverlay").css("display", "flex");

    // Make an AJAX request to a PHP file to send OTP
    $.ajax({
        url: "endpoint/api.php",
        type: "POST",
        data: {
            action: "sendotp",
            email: emailInput,
        },
        success: function (response) {
            $("#otp-div").removeClass("hidden");
            $("#otp").prop("disabled", false);
            $("#loadingOverlay").css("display", "none");
            sendOtpLink.html("Sent!").addClass("text-green-500");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while processing your request",
            });

            // Re-enable the "Send OTP" link and email input on error
            sendOtpLink.css("pointer-events", "auto");
            $("#email").prop("disabled", false);
            $("#loadingOverlay").css("display", "none");
        },
    });
});

$("#verifyOtp").on("click", function () {
    var enteredOTP = $("#otp").val();
    var enteredEmail = $("#email").val();

    $("#loadingOverlay").css("display", "flex");
    // Make an AJAX request to verify OTP
    $.ajax({
        url: "endpoint/api.php",
        type: "POST",
        data: {
            action: "verifyotp",
            otp: enteredOTP,
            otp_email: enteredEmail,
        },
        success: function (response) {
            if (response === "OTP Verified") {
                $("#verifyOtp").html("Verified!").addClass("text-green-500");
                $("#verifyOtp").off("click");
                $("#otp").prop("disabled", true);

                $("#password").prop("disabled", false);

                $("#loadingOverlay").css("display", "none");
                Swal.fire({
                    icon: "success",
                    title: "OTP Verified",
                    text: "You can now proceed with the registration.",
                });
            } else if (response === "OTP Expired") {
                $("#loadingOverlay").css("display", "none");

                Swal.fire({
                    icon: "error",
                    title: "Expired OTP",
                    text: "Please resend new OTP.",
                });

                $("#sendOtpLink").css("pointer-events", "auto");
                $("#email").prop("disabled", false);
                $("#otp").val("");
                $("#otp-div").addClass("hidden");
                $("#otp").prop("disabled", true);
            } else {
                $("#loadingOverlay").css("display", "none");
                Swal.fire({
                    icon: "error",
                    title: "Invalid OTP",
                    text: "Please enter the correct OTP.",
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
            $("#loadingOverlay").css("display", "none");
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while processing your request",
            });
        },
    });
});

$("#reg-form").submit(function (e) {
    e.preventDefault();
    $("#loadingOverlay").css("display", "flex");
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var otp = $("#otp").val();

    // Check if OTP is entered
    if (!otp) {
        $("#loadingOverlay").css("display", "none");
        Swal.fire({
            icon: "error",
            title: "Missing OTP",
            text: "Please verify your email using the OTP!",
        });
        return;
    }

    // Check if password is entered
    if (!password) {
        $("#loadingOverlay").css("display", "none");
        Swal.fire({
            icon: "error",
            title: "Missing Password",
            text: "Please verify OTP and enter a password!",
        });
        return;
    }

    $("#loadingOverlay").css("display", "flex");

    var formData = {
        action: "registration",
        name: name,
        email: email,
        password: password,
        otp: otp,
    };

    $.ajax({
        type: "POST",
        url: "endpoint/api.php",
        data: formData,
        success: function (response) {
            if (response === "reg_success") {
                $("#loadingOverlay").css("display", "none");
                Swal.fire({
                    icon: "success",
                    title: "Registartion Successful",
                    text: "You will be redirected to login page in 5 seconds",
                    showConfirmButton: false,
                    timer: 5000,
                }).then(function () {
                    // Redirect to login.php after 5 seconds
                    window.location.href = "login.php";
                });
            } else if (response === "OTP Expired") {
                $("#loadingOverlay").css("display", "none");

                Swal.fire({
                    icon: "error",
                    title: "Expired OTP",
                    text: "Please resend new OTP and register again!.",
                });

                $("#sendOtpLink").css("pointer-events", "auto");
                $("#email").prop("disabled", false);
                $("#otp").val("");
                $("#otp-div").addClass("hidden");
                $("#otp").prop("disabled", true);
            } else {
                $("#loadingOverlay").css("display", "none");
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response, 
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX Error:", textStatus, errorThrown);
        },
    });
});

$("#login-form").submit(function (e) {
    e.preventDefault();
    $("#loadingOverlay").css("display", "flex");
    var email = $("#email").val();
    var password = $("#password").val();

    if (!email) {
        $("#loadingOverlay").css("display", "none");
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email!",
        });
        return;
    }

    if (!password) {
        $("#loadingOverlay").css("display", "none");
        Swal.fire({
            icon: "error",
            title: "Missing Password",
            text: "Please enter your password!",
        });
        return;
    }

    var loginData = {
        action: "login",
        email: $('#email').val(),
        password: $('#password').val()
    };
    
    $.ajax({
        type: 'POST',
        url: 'endpoint/api.php',
        data: loginData,
        success: function(response) {
            if (response === 'login_success') {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "You will be redirected to dashboard in 2 seconds!",
                    showConfirmButton: false,
                    timer: 2000,
                }).then(function () {
                    window.location.href = 'loggedin.php';
                });
            } else if (response === 'login_failed') {
                Swal.fire({
                    icon: "error",
                    title: "Login failed",
                    text: "Please check your credentials.",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unexpected response from server!",
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX Error:', textStatus, errorThrown);
        }
    });

});

$('#logout').click(function(e) {
    e.preventDefault();

    $.ajax({
        type: 'POST',
        url: 'endpoint/api.php',
        data: {action: "logout"},
        success: function(response) {
            window.location.href = 'login.php';
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX Error:', textStatus, errorThrown);
        }
    });
});