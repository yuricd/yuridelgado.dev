import { getHighlights } from './text'

describe('text', () => {
  describe('getHighlights', () => {
    it('should return highlight', () => {
      const res = getHighlights('cont')
      expect(res).toBe('cont')
    })
  })
})