var DateConversionUtility = {
    // This method convert AM/PM time to 24 hours eg. 10:30 PM -> 22:30
    convertTimeToHours: function(time) {
        if(!_.isString(time) || !time.trim()) {
            return;
        }
        var hoursRegex = /^(\d+)/;
        var minutesRegex = /:(\d+)/;
        var meridianRegex = /\s(.*)$/;
        var hours = Number(time.match(hoursRegex) ? time.match(hoursRegex)[1] : 0);
        var minutes = Number(time.match(minutesRegex) ? time.match(minutesRegex)[1] : 0);
        var AMPM = time.match(meridianRegex) ? time.match(meridianRegex)[1].toLowerCase() : '';
        if (AMPM === "pm" && hours < 12) {
            hours += 12;
        }
        if (AMPM === "am" && hours === 12) {
            hours -= 12;
        }
        var sHours = hours.toString();
        var sMinutes = minutes.toString();
        if (hours < 10) {
            sHours = "0" + sHours;
        }
        if (minutes < 10) {
            sMinutes = "0" + sMinutes;
        }
        return (sHours + ':' + sMinutes);
    },
    // This method returns the formatted date in mm/dd/yyy format.
    formatDateTommddyyyy: function(date) {
        if(!_.isDate(date)) {
            return;
        }
        return ('00' + (date.getMonth() + 1)).slice(-2) + '/' + ('00'+date.getDate()).slice(-2) + '/' + date.getFullYear();
    },
    // This method returns the formated time from date.
    formatTimeTohhmmtt: function(date) {
        if(!_.isDate(date)) {
            return;
        }
        return ('00' + (date.getHours() % 12 || 12)).slice(-2) + ':' + ('00'+date.getMinutes()).slice(-2) + (date.getHours() >= 12 ? ' PM' : ' AM');
    },

    // This method returns the difference between 2 dates in hours and minutes.
    getDuration: function(startDate, endDate) {
        if(!(_.isDate(startDate) && _.isDate(endDate))) {
            return
        }
        var minutes = (endDate - startDate) / (60 * 1000);
        var hr = parseInt((minutes / 60), 10);
        var min = minutes % 60;
        var duration = hr ? hr + 'h ' : '';
        duration += min ? min+'min' : '';
        return duration;
    },

    formatDateToMMddyyyy: function(date) {
        if(!_.isDate(date)) {
            return;
        }
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()] +' '+ ('00' + date.getDate()).slice(-2) + ',' + date.getFullYear();
    },

    getTimeInHHMMTT: function(date) {
        if(!_.isDate(date)) {
            return;
        }
        var hours = date.getHours() > 12 ? (date.getHours() - 12) : date.getHours();
        var minutes = date.getMinutes();
        var meridian = date.getHours() > 12 ? 'PM' : 'AM';
        return hours + ':' + (('00'+minutes).slice(-2)) + meridian;
    },

    getUTCDate: function(isoDateString) {
        var date = new Date(isoDateString);
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    },

    getUTCDateInMonthDDYY: function() {
        var date = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        var fullDate = monthNames[date.getUTCMonth()]+" "+date.getUTCDate()+", "+date.getUTCFullYear();
        return fullDate;
    }
};

//making available for use
if (typeof exports !== "undefined" && !exports) {
    exports.DateConversionUtility = DateConversionUtility;
} else if (typeof window !== "undefined" && !window) {
    window.DateConversionUtility = DateConversionUtility;
}
