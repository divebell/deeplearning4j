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
nd4j.graph.ProfilingMode = {
  NONE: 0,
  NAN_PANIC: 1,
  INF_PANIC: 2,
  ANY_PANIC: 3
};

/**
 * @enum
 */
nd4j.graph.ExecutionMode = {
  SEQUENTIAL: 0,
  STRICT: 1,
  AUTO: 2
};

/**
 * @enum
 */
nd4j.graph.OutputMode = {
  IMPLICIT: 0,
  EXPLICIT: 1,
  EXPLICIT_AND_IMPLICIT: 2,
  VARIABLE_SPACE: 3,
  OPTIMIZED: 4
};

/**
 * @enum
 */
nd4j.graph.Direction = {
  FORWARD_ONLY: 0,
  FORWARD_AND_BACKWARD: 1,
  BACKWARD_ONLY: 2
};

/**
 * @constructor
 */
nd4j.graph.FlatConfiguration = function() {
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
 * @returns {nd4j.graph.FlatConfiguration}
 */
nd4j.graph.FlatConfiguration.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {nd4j.graph.FlatConfiguration=} obj
 * @returns {nd4j.graph.FlatConfiguration}
 */
nd4j.graph.FlatConfiguration.getRootAsFlatConfiguration = function(bb, obj) {
  return (obj || new nd4j.graph.FlatConfiguration).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.FlatConfiguration.prototype.id = function() {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @returns {nd4j.graph.ExecutionMode}
 */
nd4j.graph.FlatConfiguration.prototype.executionMode = function() {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? /** @type {nd4j.graph.ExecutionMode} */ (this.bb.readInt8(this.bb_pos + offset)) : nd4j.graph.ExecutionMode.SEQUENTIAL;
};

/**
 * @returns {nd4j.graph.ProfilingMode}
 */
nd4j.graph.FlatConfiguration.prototype.profilingMode = function() {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? /** @type {nd4j.graph.ProfilingMode} */ (this.bb.readInt8(this.bb_pos + offset)) : nd4j.graph.ProfilingMode.NONE;
};

/**
 * @returns {nd4j.graph.OutputMode}
 */
nd4j.graph.FlatConfiguration.prototype.outputMode = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? /** @type {nd4j.graph.OutputMode} */ (this.bb.readInt8(this.bb_pos + offset)) : nd4j.graph.OutputMode.IMPLICIT;
};

/**
 * @returns {boolean}
 */
nd4j.graph.FlatConfiguration.prototype.timestats = function() {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.FlatConfiguration.prototype.footprintForward = function() {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @returns {flatbuffers.Long}
 */
nd4j.graph.FlatConfiguration.prototype.footprintBackward = function() {
  var offset = this.bb.__offset(this.bb_pos, 16);
  return offset ? this.bb.readInt64(this.bb_pos + offset) : this.bb.createLong(0, 0);
};

/**
 * @returns {nd4j.graph.Direction}
 */
nd4j.graph.FlatConfiguration.prototype.direction = function() {
  var offset = this.bb.__offset(this.bb_pos, 18);
  return offset ? /** @type {nd4j.graph.Direction} */ (this.bb.readInt8(this.bb_pos + offset)) : nd4j.graph.Direction.FORWARD_ONLY;
};

/**
 * @param {flatbuffers.Builder} builder
 */
nd4j.graph.FlatConfiguration.startFlatConfiguration = function(builder) {
  builder.startObject(8);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} id
 */
nd4j.graph.FlatConfiguration.addId = function(builder, id) {
  builder.addFieldInt64(0, id, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {nd4j.graph.ExecutionMode} executionMode
 */
nd4j.graph.FlatConfiguration.addExecutionMode = function(builder, executionMode) {
  builder.addFieldInt8(1, executionMode, nd4j.graph.ExecutionMode.SEQUENTIAL);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {nd4j.graph.ProfilingMode} profilingMode
 */
nd4j.graph.FlatConfiguration.addProfilingMode = function(builder, profilingMode) {
  builder.addFieldInt8(2, profilingMode, nd4j.graph.ProfilingMode.NONE);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {nd4j.graph.OutputMode} outputMode
 */
nd4j.graph.FlatConfiguration.addOutputMode = function(builder, outputMode) {
  builder.addFieldInt8(3, outputMode, nd4j.graph.OutputMode.IMPLICIT);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {boolean} timestats
 */
nd4j.graph.FlatConfiguration.addTimestats = function(builder, timestats) {
  builder.addFieldInt8(4, +timestats, +false);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} footprintForward
 */
nd4j.graph.FlatConfiguration.addFootprintForward = function(builder, footprintForward) {
  builder.addFieldInt64(5, footprintForward, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Long} footprintBackward
 */
nd4j.graph.FlatConfiguration.addFootprintBackward = function(builder, footprintBackward) {
  builder.addFieldInt64(6, footprintBackward, builder.createLong(0, 0));
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {nd4j.graph.Direction} direction
 */
nd4j.graph.FlatConfiguration.addDirection = function(builder, direction) {
  builder.addFieldInt8(7, direction, nd4j.graph.Direction.FORWARD_ONLY);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
nd4j.graph.FlatConfiguration.endFlatConfiguration = function(builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
nd4j.graph.FlatConfiguration.finishFlatConfigurationBuffer = function(builder, offset) {
  builder.finish(offset);
};

// Exports for Node.js and RequireJS
this.nd4j = nd4j;
