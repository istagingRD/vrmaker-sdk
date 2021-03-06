import {
  isFunction,
  loadImage
} from '@/common/utils'
import krpanoConstants from '@/krpanoViewer/krpano-constants'

// krpano actions use jscall, next step goes here to communicate with vue
// vm should be this
const getHooks = vm => {
  return {
    startAutoRotate () {
      vm.startAutoRotate()
    },
    stopAutoRotate (bool = false) {
      vm.stopAutoRotate(bool)
    },
    prepareChangeScene (nextPanoramaName = '', nextPanoramaId = '', selectedMethod = '', nextPanoramaRotation = 0, isMarkerPoint = false, markerAth = 0) {
      const panoramas = vm.getPanoramas()
      const currentPanorama = vm.getCurrentPanorama()
      const gyroSettings = vm.getGyroSettings()
      const loadingSettings = vm.getLoadingSettings()
      const oldIndex = panoramas.findIndex(panorama => panorama.panoramaId === currentPanorama.panoramaId)
      const newIndex = panoramas.findIndex(panorama => panorama.panoramaId === nextPanoramaId)
      if (newIndex > -1) {
        const foundPanorama = panoramas[newIndex]
        const oldHLookat = krpanoConstants.getKrpanoLookAtH()
        if (isFunction(loadingSettings.onLoadingPanoramaStart)) {
          loadingSettings.onLoadingPanoramaStart()
        }
        const krpanoEl = krpanoConstants.getKrpanoEl()
        if (foundPanorama.cubemapReady) {
          krpanoEl.call(`change_scene(${nextPanoramaName}, ${nextPanoramaId}, ${selectedMethod}, ${nextPanoramaRotation},
           ${isMarkerPoint}, ${markerAth}, ${newIndex}, ${oldIndex}, ${oldHLookat}, ${gyroSettings.active});`)
          if (isFunction(loadingSettings.onLoadingPanoramaFinish)) {
            loadingSettings.onLoadingPanoramaFinish()
          }
        } else {
          loadImage(foundPanorama.downloadLink, () => {
            if (isFunction(loadingSettings.onLoadingPanoramaFinish)) {
              loadingSettings.onLoadingPanoramaFinish()
            }
            krpanoEl.call(`change_scene(${nextPanoramaName}, ${nextPanoramaId}, ${selectedMethod}, ${nextPanoramaRotation},
             ${isMarkerPoint}, ${markerAth}, ${newIndex}, ${oldIndex}, ${oldHLookat}, ${gyroSettings.active});`)
          }, (event) => {
            if (isFunction(loadingSettings.onLoadingPanoramaProgress)) {
              loadingSettings.onLoadingPanoramaProgress(event)
            }
          }, (error) => {
            if (isFunction(loadingSettings.onLoadingPanoramaError)) {
              loadingSettings.onLoadingPanoramaError(error)
            }
          })
        }
      }
    },
    changeImage (nextPanoramaId, selectedMethod, isMarkerPoint, isWebVr) {
      // vm.selectPanorama(nextPanoramaId, selectedMethod, isMarkerPoint, isWebVr)
    },
    threeJsMoving (nextPanoramaRotation = 0, markerAth = 0, newIndex, oldIndex, oldHLookat = 0) {
      // console.log('threeJsMoving', nextPanoramaRotation, markerAth, newIndex, oldIndex, oldHLookat)
      window.animationStart = true
      window.build_scene(nextPanoramaRotation, markerAth, newIndex, oldIndex, oldHLookat)
    },
    threeJsMovingStop () {
      // console.log('threeJsMovingStop')
      window.animationStart = false
    },
    markerMousein (index = 0, mouseX = 0, mouseY = 0) {
      // vm.krpanoMarkerMousein(index, mouseX, mouseY)
    },
    markerMouseout (index) {
      // vm.krpanoMarkerMouseout(index)
    },
    setMarkerInfo (index) {
      // vm.setMarkerInfo(index)
    },
    changeCamera (h, v) {
      krpanoConstants.setKrpanoLookAtH(h)
    },
    handleShowPopup (index) {
      vm.handleShowPopup(index)
    },
    exitVrMode () {
      vm.toggleVRMode(false)
    },
    clickKrpanoScreen () {
      // vm.clickKrpanoScreen()
    }
  }
}

export default getHooks
