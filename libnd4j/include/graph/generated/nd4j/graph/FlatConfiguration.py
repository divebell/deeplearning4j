#  /* ******************************************************************************
#   *
#   *
#   * This program and the accompanying materials are made available under the
#   * terms of the Apache License, Version 2.0 which is available at
#   * https://www.apache.org/licenses/LICENSE-2.0.
#   *
#   *  See the NOTICE file distributed with this work for additional
#   *  information regarding copyright ownership.
#   * Unless required by applicable law or agreed to in writing, software
#   * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#   * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#   * License for the specific language governing permissions and limitations
#   * under the License.
#   *
#   * SPDX-License-Identifier: Apache-2.0
#   ******************************************************************************/

import flatbuffers

class FlatConfiguration(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAsFlatConfiguration(cls, buf, offset):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = FlatConfiguration()
        x.Init(buf, n + offset)
        return x

    # FlatConfiguration
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # FlatConfiguration
    def Id(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int64Flags, o + self._tab.Pos)
        return 0

    # FlatConfiguration
    def ExecutionMode(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(6))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int8Flags, o + self._tab.Pos)
        return 0

    # FlatConfiguration
    def ProfilingMode(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(8))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int8Flags, o + self._tab.Pos)
        return 0

    # FlatConfiguration
    def OutputMode(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(10))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int8Flags, o + self._tab.Pos)
        return 0

    # FlatConfiguration
    def Timestats(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(12))
        if o != 0:
            return bool(self._tab.Get(flatbuffers.number_types.BoolFlags, o + self._tab.Pos))
        return False

    # FlatConfiguration
    def FootprintForward(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(14))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int64Flags, o + self._tab.Pos)
        return 0

    # FlatConfiguration
    def FootprintBackward(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(16))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int64Flags, o + self._tab.Pos)
        return 0

    # FlatConfiguration
    def Direction(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(18))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int8Flags, o + self._tab.Pos)
        return 0

def FlatConfigurationStart(builder): builder.StartObject(8)
def FlatConfigurationAddId(builder, id): builder.PrependInt64Slot(0, id, 0)
def FlatConfigurationAddExecutionMode(builder, executionMode): builder.PrependInt8Slot(1, executionMode, 0)
def FlatConfigurationAddProfilingMode(builder, profilingMode): builder.PrependInt8Slot(2, profilingMode, 0)
def FlatConfigurationAddOutputMode(builder, outputMode): builder.PrependInt8Slot(3, outputMode, 0)
def FlatConfigurationAddTimestats(builder, timestats): builder.PrependBoolSlot(4, timestats, 0)
def FlatConfigurationAddFootprintForward(builder, footprintForward): builder.PrependInt64Slot(5, footprintForward, 0)
def FlatConfigurationAddFootprintBackward(builder, footprintBackward): builder.PrependInt64Slot(6, footprintBackward, 0)
def FlatConfigurationAddDirection(builder, direction): builder.PrependInt8Slot(7, direction, 0)
def FlatConfigurationEnd(builder): return builder.EndObject()
