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

// import { shallowRef, defineAsyncComponent } from 'vue'
// import store from '@/store'

export default {
  name: 'GPUManagement',
  title: 'label.gpuMgn',
  icon: 'project-outlined',
  resourceType: 'GPUmgn',
  columns: ['name', 'uuid', 'owners'],
  actions: [
    {
      api: 'deployVirtualMachine',
      icon: 'plus-outlined',
      label: 'label.vm.add',
      docHelp: 'adminguide/virtual_machines.html#creating-vms',
      listView: true,
      component: () => import('@/views/compute/DeployVM.vue')
    }
  ]
}
