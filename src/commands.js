import sketch from 'sketch'

export function showTestAlert() {
  sendAlert("It's alive 🙌", "hi")
}


// invisible functions


function sendAlert(dataHeader, dataError) {
  var UI = require('sketch/ui')
  dataHeader = String(dataHeader)
  if (0 >= dataHeader.length) {
    dataHeader = "Notification"
  }
  UI.alert(dataHeader, String(dataError))
}

function setSetting(stringWhere, stringValue) {
  var Settings = require('sketch/settings')
  Settings.setGlobalSettingForKey(stringWhere, stringValue)
}

function getSavedSetting(stringWhere) {
  var Settings = require('sketch/settings')
  return Settings.globalSettingForKey(stringWhere)
}