<template>
  <div>
    <card>
      <div slot="header">
        <h4 class="card-title">Add new Device</h4>
      </div>
      <div class="row">
        <div class="col-4">
          <base-input
            label="Device Name"
            type="text"
            placeholder="Home, Office"
          >
          </base-input>
        </div>
        <div class="col-4">
          <base-input label="Device ID" type="text" placeholder="7777777">
          </base-input>
        </div>
        <div class="col-4">
          <slot name="label">
            <label> Template </label>
          </slot>
          <el-select
            class="select-primary"
            value="1"
            placeholder="Selecciona un valor"
            style="width: 100%"
          >
            <el-option
              class="text-dark"
              value="Template1"
              label="Template1"
            ></el-option>
            <el-option
              class="text-dark"
              value="Template2"
              label="Template2"
            ></el-option>
            <el-option
              class="text-dark"
              value="Template3"
              label="Template3"
            ></el-option>
          </el-select>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { Form, Table, TableColumn } from "element-ui";
import { Select, Option } from "element-ui";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select,
  },
};
</script>