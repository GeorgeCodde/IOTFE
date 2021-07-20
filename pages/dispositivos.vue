<template>
  <div>
    <!-- Forma para agegar dispositivos -->
    <div class="row">
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

        <div class="row pull-right">
          <div class="col-12">
            <base-button type="primary" class="mb-3" size="lg">
              Add
            </base-button>
          </div>
        </div>
      </card>
    </div>
    <!-- Tabla de dsipositivos agregados -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Add new Device</h4>
        </div>
        <div class="row">
          <el-table :data="devices">
            <el-table-column label="#" min-width="50" align="center">
              <div slot-scope="{ row, $index }">
                {{ $index + 1 }}
              </div>
            </el-table-column>
            <el-table-column prop="name" label="Name"> </el-table-column>
            <el-table-column prop="dId" label="Device Id"> </el-table-column>
            <el-table-column
              prop="teplateName"
              label="Template"
            ></el-table-column>
            <el-table-column label="Actions">
              <div slot-scope="{ row, $index }">
                <el-tooltip
                  content="Database Saver"
                  effect="Light"
                  :open-delay="300"
                  placement="top"
                >
                  <base-switch
                    @click="updateSaverRuleStatus($index)"
                    :value="row.saverRule"
                    type="primary"
                    on-text="On"
                    off-text="Off"
                  >
                  </base-switch>
                </el-tooltip>

                <el-tooltip
                  content="Delete"
                  effect="Light"
                  :open-delay="300"
                  placement="top"
                >
                  <base-button
                    type="danger"
                    icon
                    size="sm"
                    class="btn-link"
                    @click="deleteDevice(row)"
                  >
                    <i class="tim-icons icon-simple-remove"></i>
                  </base-button>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
        </div>

        <div class="row pull-right">
          <div class="col-12">
            <base-button type="primary" class="mb-3" size="lg">
              Add
            </base-button>
          </div>
        </div>
      </card>
    </div>

    <!-- Impreción de el objeto Dispositivos -->
    <!-- <pre>
      {{ devices }}
    </pre> -->
    <Json :value="devices"> </Json>
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
  data() {
    return {
      devices: [
        {
          name: "Home",
          dId: "8888",
          teplateName: "Power Sensor",
          emplateId: "98564554654545445kljkjlkkj",
          saverRule: false,
        },
        {
          name: "Ofice",
          dId: "7777",
          teplateName: "Power Sensor",
          emplateId: "98564554654545445kljkjlkkj",
          saverRule: true,
        },
        {
          name: "Granja",
          dId: "9999",
          teplateName: "Power Sensor",
          emplateId: "98564554654545445kljkjlkkj",
          saverRule: false,
        },
      ],
    };
  },
  methods: {
    deleteDevice(device) {
      alert("Deleting " + device.name);
    },
    updateSaverRuleStatus(index) {
      this.devices[index].saverRule = !this.devices[index].saverRule;
    },
  },
};
</script>