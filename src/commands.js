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

export function checkIfNotification() {
  var notificationObject = getSavedSetting(savedSettingName)
  sendAlert(String(notificationObject))
  var document = require('sketch/dom').getSelectedDocument()
  sendAlert(String(document).includes(notificationObject.path))
  if (String(document).includes(notificationObject.path)) {
  sendAlert(notificationObject.text)
  }
  sendAlert(String(document))
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