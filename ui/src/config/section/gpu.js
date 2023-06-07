// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { shallowRef, defineAsyncComponent } from 'vue'
// import store from '@/store'

export default {
  name: 'GPUManagement',
  title: 'label.gpuMgn',
  icon: 'project-outlined',
  resourceType: 'GPUmgn',
  columns: ['name', 'displayname', 'state', 'ipaddress', 'account', 'hostname'],
  details: ['displayname', 'name', 'id', 'state', 'ipaddress', 'ip6address', 'templatename', 'ostypename',
    'serviceofferingname', 'isdynamicallyscalable', 'haenable', 'hypervisor', 'boottype', 'bootmode', 'account',
    'domain', 'zonename', 'userdataid', 'userdataname', 'userdataparams', 'userdatadetails', 'userdatapolicy', 'hostcontrolstate'],
  actions: [
    {
      api: 'deployVirtualMachine',
      icon: 'plus-outlined',
      label: 'label.vm.add',
      docHelp: 'adminguide/virtual_machines.html#creating-vms',
      listView: true,
      component: () => import('@/views/compute/DeployVM.vue')
    },
    {
      api: 'updateVirtualMachine',
      icon: 'edit-outlined',
      label: 'label.action.edit.instance',
      docHelp: 'adminguide/virtual_machines.html#changing-the-vm-name-os-or-group',
      dataView: true,
      popup: true,
      component: shallowRef(defineAsyncComponent(() => import('@/views/compute/EditVM.vue')))
    },
    {
      api: 'startVirtualMachine',
      icon: 'caret-right-outlined',
      label: 'label.action.start.instance',
      message: 'message.action.start.instance',
      docHelp: 'adminguide/virtual_machines.html#stopping-and-starting-vms',
      dataView: true,
      groupAction: true,
      popup: true,
      groupMap: (selection, values) => { return selection.map(x => { return { id: x, considerlasthost: values.considerlasthost } }) },
      args: ['considerlasthost'],
      show: (record) => { return ['Stopped'].includes(record.state) },
      component: shallowRef(defineAsyncComponent(() => import('@/views/compute/StartVirtualMachine.vue')))
    },
    {
      api: 'expungeVirtualMachine',
      icon: 'delete-outlined',
      label: 'label.action.expunge.instance',
      message: (record) => { return record.backupofferingid ? 'message.action.expunge.instance.with.backups' : 'message.action.expunge.instance' },
      docHelp: 'adminguide/virtual_machines.html#deleting-vms',
      dataView: true,
      show: (record, store) => { return ['Destroyed', 'Expunging'].includes(record.state) && store.features.allowuserexpungerecovervm }
    },
    {
      api: 'destroyVirtualMachine',
      icon: 'delete-outlined',
      label: 'label.action.destroy.instance',
      message: 'message.action.destroy.instance',
      docHelp: 'adminguide/virtual_machines.html#deleting-vms',
      dataView: true,
      groupAction: true,
      args: (record, store, group) => {
        return (['Admin'].includes(store.userInfo.roletype) || store.features.allowuserexpungerecovervm)
          ? ['expunge'] : []
      },
      popup: true,
      groupMap: (selection, values) => { return selection.map(x => { return { id: x, expunge: values.expunge } }) },
      show: (record) => { return ['Running', 'Stopped', 'Error'].includes(record.state) },
      component: shallowRef(defineAsyncComponent(() => import('@/views/compute/DestroyVM.vue')))
    }
  ]
}
