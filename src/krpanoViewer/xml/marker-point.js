const getMarkerPointXml = (marker, ath, atv, category, hotspotIcon, useCustomIcon, index, isMarkerPoint, getKrpanoXOffset) => {
  return `<hotspot
  name="markerInfo_${marker.objectId}"
  style="markerInfo"
  scale="0"
  visible="false"
  ath="${ath}"
  atv="${atv - 6}"
  enabled="false"
  zorder="2"
  type="text"
  html="${category}" />
    <hotspot
  name="marker_${marker.objectId}"
  style="${hotspotIcon(marker, useCustomIcon)}"
  scale="1"
  ath="${ath}"
  atv="${atv}"
  zorder="1"
  onclick="prepare_change_scene(panorama_${marker.nextPanoramaId}, ${marker.nextPanoramaId}, 'Hotspot', ${getKrpanoXOffset() - (marker.nextRotation ? marker.nextRotation.y : 0)}, ${isMarkerPoint}, ${ath});"
  ondown="marker_mousein(${marker.objectId}, ${index});"
  onover="marker_mousein(${marker.objectId}, ${index});"
  onout="marker_mouseout(${marker.objectId}, ${index});" />`
}

export default getMarkerPointXml
