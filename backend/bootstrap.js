import { Buffer } from "node:buffer";

// Polyfill for Node.js v24 compatibility
if (!globalThis.SlowBuffer) {
  class SlowBuffer extends Buffer {
    constructor(size) {
      super(size);
    }
  }
  SlowBuffer.prototype.equal = Buffer.prototype.equals;
  globalThis.SlowBuffer = SlowBuffer;
}

await import("./index.js");