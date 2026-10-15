import fs from 'node:fs'
import { createRequire } from 'node:module'
import { __unstable__loadDesignSystem } from 'tailwindcss'
const require = createRequire(import.meta.url)
const version = require('tailwindcss/package.json').version
const theme = fs.readFileSync(require.resolve('tailwindcss/theme.css'), 'utf8')
const ds = await __unstable__loadDesignSystem('@tailwind utilities;\n' + theme, { base: process.cwd() })
console.log('tailwindcss', version)
for (const c of ['w-[calc(0.1px+0.2px)]','m-[calc(0.3px-0.1px)]','w-[calc(0.1*3px)]','p-[calc(0.1rem*3)]']) {
  const [out] = ds.canonicalizeCandidates([c], { rem: 16, collapse: true, logicalToPhysical: false })
  console.log(`${c}  =>  ${out}`)
}
