const keyPrefix = 'LoginManager-'

let config = {
  storageKeys: {
    data: `${keyPrefix}data`
  },
  classes: {
    isTargetContainer: 'is-targetContainer',
    dropZone: 'DropTarget-dropZone',
    toggleButton: 'DropTarget-toggleButton'
  },
  TARGETING_STATE: {
    off: 'dropstate-off',
    before: 'dropstate-before',
    after: 'dropstate-after'
  }
}

export default config
