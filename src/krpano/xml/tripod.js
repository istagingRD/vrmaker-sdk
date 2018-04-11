import {
  xmlUrlString
} from '@/common/helpers'

function setLogoTripodSize (logoSize) {
  if (window.isNaN(logoSize) || logoSize <= 0) {
    return 0
  }
  return (logoSize / 100)
}

const getLogoTripodXml = function (image, logoSize, showTop = false) {
  return `<hotspot name="logoTripod" keep="true" url="${xmlUrlString(image)}" ath="0" atv="90"
distorted="true" scale="${setLogoTripodSize(logoSize)}" enabled="false" />
<hotspot name="topLogoTripod" keep="true" url="${xmlUrlString(image)}" ath="0" atv="-90" distorted="true"
 scale="${setLogoTripodSize(logoSize)}" visible="${showTop}" enabled="false" />`
}

export default getLogoTripodXml
