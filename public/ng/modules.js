angular.module('photoManiacApp', ['ngRoute', 'jcs-autoValidate', 'ngFlash', 'ui.bootstrap', 'ngAnimate', 'bootstrapLightbox'])
    .run(function(defaultErrorMessageResolver) {
           defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
                errorMessages['requiredName'] = "Please enter your name.";
                errorMessages['requiredMobile'] = "Please enter your mobile number.";
                errorMessages['minlengthMobile'] = "Please enter at least 10 characters.";
                errorMessages['patternMobile'] = "Please enter only numbers.";
                errorMessages['requiredMessageBody'] = "Please enter your question details here.";
                errorMessages['requiredOldPassword'] = "Please enter your old password here."
                errorMessages['requiredNewPassword'] = "Please enter your new password here."
                errorMessages['requiredConfirmPassword'] = "Please confirm your new password here."
                errorMessages['matchNotFound'] = "New Password and Confirm new Password does not match."
           });
       });