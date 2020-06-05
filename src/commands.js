const savedSettingName = "Notifications"

export function showTestAlert() {
  var notificationObject = getSavedSetting(savedSettingName)
  sendAlert(notificationObject.headline, notificationObject.text)
}

export function editPath() {
  var notificationObject = getSavedSetting(savedSettingName)
  var UI = require('sketch/ui')
  var document = require('sketch/dom').getSelectedDocument()
  UI.getInputFromUser(
    "Type in the word / path where you want to get notified when opening a document." + "\n\n" + "Maybe you want use (parts of) this:" + "\n\n" + String(document.path),
    {
      initialValue: notificationObject.path,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }
      if (typeof value === "string") {
        notificationObject.path = value
      }
      setSetting(savedSettingName, notificationObject)
      sendMessageToBottom("Path set to " + notificationObject.path + ".")
    }
  )
}

export function editAlertHeadline() {
  var notificationObject = getSavedSetting(savedSettingName)
  var UI = require('sketch/ui')
  UI.getInputFromUser(
    "Type in the headline of the notification.",
    {
      initialValue: notificationObject.headline,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }
      if (typeof value === "string") {
        notificationObject.headline = value
      }
      setSetting(savedSettingName, notificationObject)
      sendMessageToBottom("Headline set to " + notificationObject.headline + ".")
    }
  )
}

export function editAlertText() {
  var notificationObject = getSavedSetting(savedSettingName)
  var UI = require('sketch/ui')
  UI.getInputFromUser(
    "Type in the description you want to be shown on the notification.",
    {
      initialValue: notificationObject.text,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      }
      if (typeof value === "string") {
        notificationObject.text = value
      }
      setSetting(savedSettingName, notificationObject)
      sendMessageToBottom("Text set to " + notificationObject.text + ".")
    }
  )
}


export function resetSettings() {
  newNotificationObject()
  sendMessageToBottom("Successfully reset.")
}

// invisible functions

export function checkIfNotification(context) {

  setTimeout(function () {
    var notificationObject = getSavedSetting(savedSettingName)
    var document = require('sketch/dom').getSelectedDocument()
    if (String(document.path).includes(notificationObject.path)) {
      sendAlert(notificationObject.headline, notificationObject.text)
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

function sendAlert(dataHeader, dataError) {
  var UI = require('sketch/ui')
  UI.alert(String(dataHeader), String(dataError))
}

function sendMessageToBottom(dataBottom) {
  var UI = require('sketch/ui')
  UI.message(String(dataBottom))
}

function newNotificationObject() {
  var notificationObject = {
    path: "OneDrive",
    text: "Otherwise you could loose work now or later." + "\n\n" + "Please make sure you did.",
    headline: "Did you make a backup already?"
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