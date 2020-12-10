import { BigInt } from "@graphprotocol/graph-ts"
import {
  ParsiqToken,
  Approval,
  Transfer
} from "../generated/ParsiqToken/ParsiqToken"

import { _Approval, _Transfer } from "../generated/schema"
  

export function handleApproval(event: Approval): void {
  let entity = _Approval.load(event.params.owner.toHex())

  if (entity == null) {
    entity = new _Approval(event.params.owner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.timestamp = event.block.timestamp
  entity.blockNumber = event.block.number
  entity.save()
}


export function handleTransfer(event: Transfer): void {
  let entity = _Transfer.load(event.params.from.toHex())

  if (entity == null) {
    entity = new _Transfer(event.params.from.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.timestamp = event.block.timestamp
  entity.blockNumber = event.block.number
  entity.save()
}