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

class UIGraphStructure(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAsUIGraphStructure(cls, buf, offset):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = UIGraphStructure()
        x.Init(buf, n + offset)
        return x

    # UIGraphStructure
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # UIGraphStructure
    def Inputs(self, j):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            a = self._tab.Vector(o)
            return self._tab.String(a + flatbuffers.number_types.UOffsetTFlags.py_type(j * 4))
        return ""

    # UIGraphStructure
    def InputsLength(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.VectorLen(o)
        return 0

    # UIGraphStructure
    def InputsPair(self, j):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(6))
        if o != 0:
            x = self._tab.Vector(o)
            x += flatbuffers.number_types.UOffsetTFlags.py_type(j) * 4
            x = self._tab.Indirect(x)
            from .IntPair import IntPair
            obj = IntPair()
            obj.Init(self._tab.Bytes, x)
            return obj
        return None

    # UIGraphStructure
    def InputsPairLength(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(6))
        if o != 0:
            return self._tab.VectorLen(o)
        return 0

    # UIGraphStructure
    def Outputs(self, j):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(8))
        if o != 0:
            a = self._tab.Vector(o)
            return self._tab.String(a + flatbuffers.number_types.UOffsetTFlags.py_type(j * 4))
        return ""

    # UIGraphStructure
    def OutputsLength(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(8))
        if o != 0:
            return self._tab.VectorLen(o)
        return 0

    # UIGraphStructure
    def Variables(self, j):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(10))
        if o != 0:
            x = self._tab.Vector(o)
            x += flatbuffers.number_types.UOffsetTFlags.py_type(j) * 4
            x = self._tab.Indirect(x)
            from .UIVariable import UIVariable
            obj = UIVariable()
            obj.Init(self._tab.Bytes, x)
            return obj
        return None

    # UIGraphStructure
    def VariablesLength(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(10))
        if o != 0:
            return self._tab.VectorLen(o)
        return 0

    # UIGraphStructure
    def Ops(self, j):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(12))
        if o != 0:
            x = self._tab.Vector(o)
            x += flatbuffers.number_types.UOffsetTFlags.py_type(j) * 4
            x = self._tab.Indirect(x)
            from .UIOp import UIOp
            obj = UIOp()
            obj.Init(self._tab.Bytes, x)
            return obj
        return None

    # UIGraphStructure
    def OpsLength(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(12))
        if o != 0:
            return self._tab.VectorLen(o)
        return 0

def UIGraphStructureStart(builder): builder.StartObject(5)
def UIGraphStructureAddInputs(builder, inputs): builder.PrependUOffsetTRelativeSlot(0, flatbuffers.number_types.UOffsetTFlags.py_type(inputs), 0)
def UIGraphStructureStartInputsVector(builder, numElems): return builder.StartVector(4, numElems, 4)
def UIGraphStructureAddInputsPair(builder, inputsPair): builder.PrependUOffsetTRelativeSlot(1, flatbuffers.number_types.UOffsetTFlags.py_type(inputsPair), 0)
def UIGraphStructureStartInputsPairVector(builder, numElems): return builder.StartVector(4, numElems, 4)
def UIGraphStructureAddOutputs(builder, outputs): builder.PrependUOffsetTRelativeSlot(2, flatbuffers.number_types.UOffsetTFlags.py_type(outputs), 0)
def UIGraphStructureStartOutputsVector(builder, numElems): return builder.StartVector(4, numElems, 4)
def UIGraphStructureAddVariables(builder, variables): builder.PrependUOffsetTRelativeSlot(3, flatbuffers.number_types.UOffsetTFlags.py_type(variables), 0)
def UIGraphStructureStartVariablesVector(builder, numElems): return builder.StartVector(4, numElems, 4)
def UIGraphStructureAddOps(builder, ops): builder.PrependUOffsetTRelativeSlot(4, flatbuffers.number_types.UOffsetTFlags.py_type(ops), 0)
def UIGraphStructureStartOpsVector(builder, numElems): return builder.StartVector(4, numElems, 4)
def UIGraphStructureEnd(builder): return builder.EndObject()
