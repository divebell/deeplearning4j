/*******************************************************************************
 * Copyright (c) 2015-2018 Skymind, Inc.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ******************************************************************************/

//
// @author raver119@gmail.com
//

#include <ops/declarable/OpRegistrator.h>
#include <ops/declarable/LegacyTransformSameOp.h>
#include <exceptions/precondition_exception.h>
#include "../samediff_cpp.h"

namespace samediff {
    SameDiff create() {
        return SameDiff();
    }


    namespace arithmetic {
        Variable Add(const Variable &x, const Variable &y, const std::string &name) {
            samediff::precondition_exception::check(x.sd() == y.sd(), "Add: both variables must belong to the same SameDiff instance");

            auto sd = x.sd();
            auto node = new nd4j::graph::Node(nd4j::ops::OpRegistrator::getInstance()->getOperation("add"), sd->graph()->nextNodeId(), {x.nodeId(), y.nodeId()});

            if (!name.empty())
                node->setName(name);

            sd->graph()->addNode(node);
            return Variable(*sd, node);
        }

        Variable Neg(const Variable &x, const std::string &name) {
            auto sd = x.sd();
            auto op = new nd4j::ops::LegacyTransformSameOp(nd4j::transform::SameOps::Neg);
            auto node = new nd4j::graph::Node(op, sd->graph()->nextNodeId(), {x.nodeId()});
            node->setDeductable(true);

            if (!name.empty())
                node->setName(name);

            sd->graph()->addNode(node);
            return Variable(*sd, node);
        }
    }


    namespace transform {
        Tuple Tear(const Variable &x, const std::vector<int> &axis, const std::string &name) {
            auto sd = x.sd();

            auto node = new nd4j::graph::Node(nd4j::ops::OpRegistrator::getInstance()->getOperation("tear"), sd->graph()->nextNodeId(), {x.nodeId()}, {}, {}, {}, {}, axis);

            if (!name.empty())
                node->setName(name);

            sd->graph()->addNode(node);
            return Tuple(*sd, node);
        }
    }
}