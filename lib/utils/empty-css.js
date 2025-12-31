// 空模块，用于替换 katex CSS 导入（因为我们已经通过 CDN 引入了）
// 同时支持 CommonJS 和 ESM 格式，兼容 Next.js 14

// CommonJS 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {}
  }
  
  // ESM 导出（如果包使用 ESM 格式）
  export default {}