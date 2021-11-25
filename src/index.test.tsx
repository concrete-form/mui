import { AvailableControls, AvailableLayout } from '@concrete-form/core'

const controlsName: string[] = Object.entries(AvailableControls).filter(([_, value]) => typeof value === 'string').map(([_, name]) => name as string)
const layoutsName: string[] = Object.entries(AvailableLayout).filter(([_, value]) => typeof value === 'string').map(([_, name]) => name as string)

describe('Controls', () => {
  it('expose each controls as standalone module', async () => {
    for (const controlName of controlsName) {
      expect(await import(`./${controlName}`)).toHaveProperty('default')
    }
  })

  it('expose each layout as standalone module', async () => {
    for (const layoutName of layoutsName) {
      expect(await import(`./${layoutName}`)).toHaveProperty('default')
    }
  })

  it('expose each controls from the package root', async () => {
    const exported = Object.keys(await import('./'))
    for (const controlName of controlsName) {
      expect(exported).toContain(controlName)
    }
  })

  it('expose each layouts from the package root', async () => {
    const exported = Object.keys(await import('./'))
    for (const layoutName of layoutsName) {
      expect(exported).toContain(layoutName)
    }
  })
})
