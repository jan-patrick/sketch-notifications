const savedSettingName = "Notifications"

export function showTestAlert() {
  checkIfNotification()
}

export function editPath() {
  sendAlert("hi")
}

export function editAlertText() {
  sendAlert("hi")
}

// invisible functions

export function checkIfNotification(context) {

  setTimeout(function () {
    var notificationObject = getSavedSetting(savedSettingName)
    var document = require('sketch/dom').getSelectedDocument()
    if (String(document.path).includes(notificationObject.path)) {
      sendAlert(notificationObject.text)
    }
  }, 1);
}

export function checkIfNotificationsAlreadySaved() {
  var notificationObject = getSavedSetting(savedSettingName)
  if (typeof notificationObject != "object") {
    newNotificationObject()
  }
}


// other functions

function sendAlert(dataError) {
  var UI = require('sketch/ui')
  UI.alert("Notification for this document", String(dataError))
}

function newNotificationObject() {
  var notificationObject = {
    path: "OneDrive",
    text: "Did you make a backup already?"
  }
  setSetting(savedSettingName, notificationObject)
}

function setSetting(stringWhere, stringValue) {
  var Settings = require('sketch/settings')
  Settings.setGlobalSettingForKey(stringWhere, stringValue)
}

function getSavedSetting(stringWhere) {
  var Settings = require('sketch/settings')
  return Settings.globalSettingForKey(stringWhere)
}