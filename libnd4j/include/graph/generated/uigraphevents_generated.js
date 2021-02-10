/*
 *  ******************************************************************************
 *  *
 *  *
 *  * This program and the accompanying materials are made available under the
 *  * terms of the Apache License, Version 2.0 which is available at
 *  * https://www.apache.org/licenses/LICENSE-2.0.
 *  *
 *  *  See the NOTICE file distributed with this work for additional
 *  *  information regarding copyright ownership.
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  * License for the specific language governing permissions and limitations
 *  * under the License.
 *  *
 *  * SPDX-License-Identifier: Apache-2.0
 *  *****************************************************************************
 */

/**
 * @const
 * @namespace
 */
var nd4j = nd4j || {};

/**
 * @const
 * @namespace
 */
nd4j.graph = nd4j.graph || {};

/**
 * @enum
 */
nd4j.graph.UIEventType = {
  ADD_NAME: 0,
  SCALAR: 1,
  ARRAY: 2,
  ARRAY_LIST: 3,
  HISTOGRAM: 4,
  IMAGE: 5,
  SUMMARY_STATISTICS: 6,
  OP_TIMING: 7,
  HARDWARE_STATE: 8
};

/**
 * @enum
 */
nd4j.graph.UIEventSubtype = {
  NONE: 0,
  EVALUATION: 1,
  LOSS: 2,
  LEARNING_RATE: 3,
  TUNING_METRIC: 4,
  PERFORMANCE: 5,
  PROFILING: 6,
  FEATURE_LABEL: 7,
  PREDICTION: 8,
  USER_CUSTOM: 9
};

/**
 * @enum
 */
nd4j.graph.UIHistogramType = {
  DISCRETE: 0,
  EQUAL_SPACING: 1,
  CUSTOM: 2
};

/**
 * @constructor
 */
nd4j.graph.UIEvent = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {nd4j.graph.UIEvent}
 */
nd4j.graph.UIEvent.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {nd4j.graph.UIEvent=} obj
 * @returns {nd4j.graph.UIEvent}
 */
nd4j.graph.UIEvent.getRootAsUIEvent = function(bb, obj) {
  return (obj || new nd4j.graph.UIEvent).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {nd4j.graph.UIEventType}
 */
nd4j.graph.UIEvent.prototype.eventType = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? /** @type {nd4j.graph.UIEventType} */ (this.bb.readInt8(this.bb_pos + offset)) : nd4j.graph.UIEventType.ADD_NAME;
};

/**
 * @returns {nd4j.graph.UIEventSubtype}
 */
nd4j.graph.UIEvent.prototype.eventSubType = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? /** @type {nd4j.graph.UIEventSubtype} */ (this.bb.readInt8(this.bb_pos + offset)) : nd4j.graph.UIEventSubtype.NONE;
};

/**
 * @returns {number}
 */
nd4j.graph.UIEvent.prototype.nameIdx = function() {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.UIEvent.prototype.timestamp = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @returns {number}
 */
nd4j.graph.UIEvent.prototype.iteration = function() {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
nd4j.graph.UIEvent.prototype.epoch = function() {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @returns {number}
 */
nd4j.graph.UIEvent.prototype.variableId = function() {
  var offset = this.bb.__offset(this.bb_pos, 16);
  return offset ? this.bb.readInt16(this.bb_pos + offset) : 0;
};

/**
 * @param {nd4j.graph.FrameIteration=} obj
 * @returns {nd4j.graph.FrameIteration|null}
 */
nd4j.graph.UIEvent.prototype.frameIter = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 18);
  return offset ? (obj || new nd4j.graph.FrameIteration).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
};

/**
 * @returns {number}
 */
nd4j.graph.UIEvent.prototype.plugin = function() {
  var offset = this.bb.__offset(this.bb_pos, 20);
  return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
nd4j.graph.UIEvent.startUIEvent = function(builder) {
  builder.startObject(9);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {nd4j.graph.UIEventType} eventType
 */
nd4j.graph.UIEvent.addEventType = function(builder, eventType) {
  builder.addFieldInt8(0, eventType, nd4j.graph.UIEventType.ADD_NAME);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {nd4j.graph.UIEventSubtype} eventSubType
 */
nd4j.graph.UIEvent.addEventSubType = function(builder, eventSubType) {
  builder.addFieldInt8(1, eventSubType, nd4j.graph.UIEventSubtype.NONE);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} nameIdx
 */
nd4j.graph.UIEvent.addNameIdx = function(builder, nameIdx) {
  builder.addFieldInt32(2, nameIdx, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} timestamp
 */
nd4j.graph.UIEvent.addTimestamp = function(builder, timestamp) {
  builder.addFieldInt64(3, timestamp, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} iteration
 */
nd4j.graph.UIEvent.addIteration = function(builder, iteration) {
  builder.addFieldInt32(4, iteration, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} epoch
 */
nd4j.graph.UIEvent.addEpoch = function(builder, epoch) {
  builder.addFieldInt32(5, epoch, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} variableId
 */
nd4j.graph.UIEvent.addVariableId = function(builder, variableId) {
  builder.addFieldInt16(6, variableId, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} frameIterOffset
 */
nd4j.graph.UIEvent.addFrameIter = function(builder, frameIterOffset) {
  builder.addFieldOffset(7, frameIterOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} plugin
 */
nd4j.graph.UIEvent.addPlugin = function(builder, plugin) {
  builder.addFieldInt16(8, plugin, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.UIEvent.endUIEvent = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
nd4j.graph.FrameIteration = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {nd4j.graph.FrameIteration}
 */
nd4j.graph.FrameIteration.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {nd4j.graph.FrameIteration=} obj
 * @returns {nd4j.graph.FrameIteration}
 */
nd4j.graph.FrameIteration.getRootAsFrameIteration = function(bb, obj) {
  return (obj || new nd4j.graph.FrameIteration).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
nd4j.graph.FrameIteration.prototype.frame = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @returns {number}
 */
nd4j.graph.FrameIteration.prototype.iteration = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readUint16(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
nd4j.graph.FrameIteration.startFrameIteration = function(builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} frameOffset
 */
nd4j.graph.FrameIteration.addFrame = function(builder, frameOffset) {
  builder.addFieldOffset(0, frameOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} iteration
 */
nd4j.graph.FrameIteration.addIteration = function(builder, iteration) {
  builder.addFieldInt16(1, iteration, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.FrameIteration.endFrameIteration = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
nd4j.graph.UIAddName = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {nd4j.graph.UIAddName}
 */
nd4j.graph.UIAddName.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {nd4j.graph.UIAddName=} obj
 * @returns {nd4j.graph.UIAddName}
 */
nd4j.graph.UIAddName.getRootAsUIAddName = function(bb, obj) {
  return (obj || new nd4j.graph.UIAddName).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
nd4j.graph.UIAddName.prototype.nameIdx = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
nd4j.graph.UIAddName.prototype.name = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Builder} builder
 */
nd4j.graph.UIAddName.startUIAddName = function(builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} nameIdx
 */
nd4j.graph.UIAddName.addNameIdx = function(builder, nameIdx) {
  builder.addFieldInt32(0, nameIdx, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} nameOffset
 */
nd4j.graph.UIAddName.addName = function(builder, nameOffset) {
  builder.addFieldOffset(1, nameOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.UIAddName.endUIAddName = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
nd4j.graph.FlatArrayList = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {nd4j.graph.FlatArrayList}
 */
nd4j.graph.FlatArrayList.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {nd4j.graph.FlatArrayList=} obj
 * @returns {nd4j.graph.FlatArrayList}
 */
nd4j.graph.FlatArrayList.getRootAsFlatArrayList = function(bb, obj) {
  return (obj || new nd4j.graph.FlatArrayList).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {number} index
 * @param {nd4j.graph.FlatArray=} obj
 * @returns {nd4j.graph.FlatArray}
 */
nd4j.graph.FlatArrayList.prototype.list = function(index, obj) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? (obj || new nd4j.graph.FlatArray).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
};

/**
 * @returns {number}
 */
nd4j.graph.FlatArrayList.prototype.listLength = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
nd4j.graph.FlatArrayList.startFlatArrayList = function(builder) {
  builder.startObject(1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} listOffset
 */
nd4j.graph.FlatArrayList.addList = function(builder, listOffset) {
  builder.addFieldOffset(0, listOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.FlatArrayList.createListVector = function(builder, data) {
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
nd4j.graph.FlatArrayList.startListVector = function(builder, numElems) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.FlatArrayList.endFlatArrayList = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
nd4j.graph.UIHistogram = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {nd4j.graph.UIHistogram}
 */
nd4j.graph.UIHistogram.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {nd4j.graph.UIHistogram=} obj
 * @returns {nd4j.graph.UIHistogram}
 */
nd4j.graph.UIHistogram.getRootAsUIHistogram = function(bb, obj) {
  return (obj || new nd4j.graph.UIHistogram).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {nd4j.graph.UIHistogramType}
 */
nd4j.graph.UIHistogram.prototype.type = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? /** @type {nd4j.graph.UIHistogramType} */ (this.bb.readInt8(this.bb_pos + offset)) : nd4j.graph.UIHistogramType.DISCRETE;
};

/**
 * @returns {number}
 */
nd4j.graph.UIHistogram.prototype.numbins = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {nd4j.graph.FlatArray=} obj
 * @returns {nd4j.graph.FlatArray|null}
 */
nd4j.graph.UIHistogram.prototype.binranges = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? (obj || new nd4j.graph.FlatArray).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
};

/**
 * @param {nd4j.graph.FlatArray=} obj
 * @returns {nd4j.graph.FlatArray|null}
 */
nd4j.graph.UIHistogram.prototype.y = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? (obj || new nd4j.graph.FlatArray).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
};

/**
 * @param {number} index
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array}
 */
nd4j.graph.UIHistogram.prototype.binlabels = function(index, optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
};

/**
 * @returns {number}
 */
nd4j.graph.UIHistogram.prototype.binlabelsLength = function() {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
nd4j.graph.UIHistogram.startUIHistogram = function(builder) {
  builder.startObject(5);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {nd4j.graph.UIHistogramType} type
 */
nd4j.graph.UIHistogram.addType = function(builder, type) {
  builder.addFieldInt8(0, type, nd4j.graph.UIHistogramType.DISCRETE);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numbins
 */
nd4j.graph.UIHistogram.addNumbins = function(builder, numbins) {
  builder.addFieldInt32(1, numbins, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} binrangesOffset
 */
nd4j.graph.UIHistogram.addBinranges = function(builder, binrangesOffset) {
  builder.addFieldOffset(2, binrangesOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} yOffset
 */
nd4j.graph.UIHistogram.addY = function(builder, yOffset) {
  builder.addFieldOffset(3, yOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} binlabelsOffset
 */
nd4j.graph.UIHistogram.addBinlabels = function(builder, binlabelsOffset) {
  builder.addFieldOffset(4, binlabelsOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.UIHistogram.createBinlabelsVector = function(builder, data) {
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
nd4j.graph.UIHistogram.startBinlabelsVector = function(builder, numElems) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.UIHistogram.endUIHistogram = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
nd4j.graph.UISummaryStatistics = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {nd4j.graph.UISummaryStatistics}
 */
nd4j.graph.UISummaryStatistics.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {nd4j.graph.UISummaryStatistics=} obj
 * @returns {nd4j.graph.UISummaryStatistics}
 */
nd4j.graph.UISummaryStatistics.getRootAsUISummaryStatistics = function(bb, obj) {
  return (obj || new nd4j.graph.UISummaryStatistics).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {number}
 */
nd4j.graph.UISummaryStatistics.prototype.bitmask = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {nd4j.graph.FlatArray=} obj
 * @returns {nd4j.graph.FlatArray|null}
 */
nd4j.graph.UISummaryStatistics.prototype.min = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? (obj || new nd4j.graph.FlatArray).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
};

/**
 * @param {nd4j.graph.FlatArray=} obj
 * @returns {nd4j.graph.FlatArray|null}
 */
nd4j.graph.UISummaryStatistics.prototype.max = function(obj) {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? (obj || new nd4j.graph.FlatArray).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
};

/**
 * @returns {number}
 */
nd4j.graph.UISummaryStatistics.prototype.mean = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @returns {number}
 */
nd4j.graph.UISummaryStatistics.prototype.stdev = function() {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.UISummaryStatistics.prototype.countzero = function() {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.UISummaryStatistics.prototype.countpositive = function() {
  var offset = this.bb.__offset(this.bb_pos, 16);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.UISummaryStatistics.prototype.countnegative = function() {
  var offset = this.bb.__offset(this.bb_pos, 18);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.UISummaryStatistics.prototype.countnan = function() {
  var offset = this.bb.__offset(this.bb_pos, 20);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.UISummaryStatistics.prototype.countinf = function() {
  var offset = this.bb.__offset(this.bb_pos, 22);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 */
nd4j.graph.UISummaryStatistics.startUISummaryStatistics = function(builder) {
  builder.startObject(10);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} bitmask
 */
nd4j.graph.UISummaryStatistics.addBitmask = function(builder, bitmask) {
  builder.addFieldInt32(0, bitmask, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} minOffset
 */
nd4j.graph.UISummaryStatistics.addMin = function(builder, minOffset) {
  builder.addFieldOffset(1, minOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} maxOffset
 */
nd4j.graph.UISummaryStatistics.addMax = function(builder, maxOffset) {
  builder.addFieldOffset(2, maxOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} mean
 */
nd4j.graph.UISummaryStatistics.addMean = function(builder, mean) {
  builder.addFieldFloat64(3, mean, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} stdev
 */
nd4j.graph.UISummaryStatistics.addStdev = function(builder, stdev) {
  builder.addFieldFloat64(4, stdev, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} countzero
 */
nd4j.graph.UISummaryStatistics.addCountzero = function(builder, countzero) {
  builder.addFieldInt64(5, countzero, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} countpositive
 */
nd4j.graph.UISummaryStatistics.addCountpositive = function(builder, countpositive) {
  builder.addFieldInt64(6, countpositive, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} countnegative
 */
nd4j.graph.UISummaryStatistics.addCountnegative = function(builder, countnegative) {
  builder.addFieldInt64(7, countnegative, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} countnan
 */
nd4j.graph.UISummaryStatistics.addCountnan = function(builder, countnan) {
  builder.addFieldInt64(8, countnan, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} countinf
 */
nd4j.graph.UISummaryStatistics.addCountinf = function(builder, countinf) {
  builder.addFieldInt64(9, countinf, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.UISummaryStatistics.endUISummaryStatistics = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @constructor
 */
nd4j.graph.UIHardwareState = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {nd4j.graph.UIHardwareState}
 */
nd4j.graph.UIHardwareState.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {nd4j.graph.UIHardwareState=} obj
 * @returns {nd4j.graph.UIHardwareState}
 */
nd4j.graph.UIHardwareState.getRootAsUIHardwareState = function(bb, obj) {
  return (obj || new nd4j.graph.UIHardwareState).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {number} index
 * @returns {flatbuffers.Long}
 */
nd4j.graph.UIHardwareState.prototype.gpuMemory = function(index) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readInt64(this.bb.__vector(this.bb_pos + offset) + index * 8) : this.bb.createLong(0, 0);
};

/**
 * @returns {number}
 */
nd4j.graph.UIHardwareState.prototype.gpuMemoryLength = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.UIHardwareState.prototype.hostMemory = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 */
nd4j.graph.UIHardwareState.startUIHardwareState = function(builder) {
  builder.startObject(2);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} gpuMemoryOffset
 */
nd4j.graph.UIHardwareState.addGpuMemory = function(builder, gpuMemoryOffset) {
  builder.addFieldOffset(0, gpuMemoryOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Long>} data
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.UIHardwareState.createGpuMemoryVector = function(builder, data) {
  builder.startVector(8, data.length, 8);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addInt64(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
nd4j.graph.UIHardwareState.startGpuMemoryVector = function(builder, numElems) {
  builder.startVector(8, numElems, 8);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} hostMemory
 */
nd4j.graph.UIHardwareState.addHostMemory = function(builder, hostMemory) {
  builder.addFieldInt64(1, hostMemory, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.UIHardwareState.endUIHardwareState = function(builder) {
  var offset = builder.endObject();
  return offset;
};

// Exports for Node.js and RequireJS
this.nd4j = nd4j;
