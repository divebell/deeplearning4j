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

class IntTriple(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAsIntTriple(cls, buf, offset):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = IntTriple()
        x.Init(buf, n + offset)
        return x

    # IntTriple
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # IntTriple
    def First(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # IntTriple
    def Second(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(6))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # IntTriple
    def Third(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(8))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

def IntTripleStart(builder): builder.StartObject(3)
def IntTripleAddFirst(builder, first): builder.PrependInt32Slot(0, first, 0)
def IntTripleAddSecond(builder, second): builder.PrependInt32Slot(1, second, 0)
def IntTripleAddThird(builder, third): builder.PrependInt32Slot(2, third, 0)
def IntTripleEnd(builder): return builder.EndObject()
