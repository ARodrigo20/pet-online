import { Component } from '@angular/core';
import Query from 'devextreme/data/query';

@Component({
  selector: 'app-agenda-page',
  templateUrl: './agenda-page.component.html',
  styleUrls: ['./agenda-page.component.scss']
})
export class AgendaPageComponent {
  personas: any[] = [];
  theatreData: any[] = [];
  currentDate: Date = new Date();
  data: any[] = [];

  constructor() {
    this.personas = [
      {
        nPersona: 1,
        cNombre: 'Alejandro Flores',
      },
      {
        nPersona: 2,
        cNombre: 'Madara Uchiha',
      }
    ];

    this.data = [
      {
        nCita: 1,
        cTitulo: "Desparacitacion de milo",
        text: 'Desparacitacion de Milo',
        nPersona: 1,
        cPersona: "Alejandro Flores",
        startDate: new Date('2022-01-22T08:00:00'),
        endDate: new Date('2022-01-22T09:15:00'),
        cObservacion: 'no bañarlo dias antes'
      },
      {
        nCita: 2,
        cTitulo: "Desparacitacion 2 de milo",
        text: 'Desparacitacion 2 de Milo',
        nPersona: 5,
        cPersona: "Madara Uchiha",
        startDate: new Date('2022-01-22T10:30:00'),
        endDate: new Date('2022-01-22T12:00:00'),
      },
      {
        nCita: 3,
        cTitulo: "Desparacitacion de milo",
        text: 'Desparacitacion de Milo',
        nPersona: 5,
        startDate: new Date('2022-01-22T14:30:00'),
        endDate: new Date('2022-01-22T15:20:00'),
      },
      {
        nCita: 4,
        cTitulo: "Desparacitacion de milo",
        text: 'Desparacitacion de Milo',
        nPersona: 5,
        startDate: new Date('2021-11-28T15:30:00'),
        endDate: new Date('2021-11-28T16:20:00'),
      },
      {
        nCita: 5,
        cTitulo: "Desparacitacion de milo",
        text: 'Desparacitacion de Milo',
        nPersona: 5,
        startDate: new Date('2021-11-28T16:30:00'),
        endDate: new Date('2021-11-28T17:20:00'),
      },
    ];
  }

  onAppointmentFormOpening(data) {
    console.log("data: ", data);
    data.popup.option("toolbarItems[0].options.text", "Guardar");
    data.popup.option("toolbarItems[1].options.text", "Cancelar");
    const that = this;
    const form = data.form;
    let startDate = data.appointmentData.startDate;
    let endDate = data.appointmentData.endDate;

    form.option('items', [
      {
        label: {
          text: 'Motivo',
        },
        name: 'cTitulo',
        colSpan: 2,
        editorType: 'dxTextArea',
        editorOptions: {
          value: data.appointmentData.cTitulo,
          onValueChanged(args) {
            form.updateData('cTitulo', args.value);
          }
        },
        validationRules: [{
          type: 'required',
          message: 'Titulo es Requerido',
        }]
      },
      {
        label: {
          text: 'Persona',
        },
        editorType: 'dxSelectBox',
        colSpan: 2,
        dataField: 'nPersona',
        editorOptions: {
          items: that.personas,
          value: data.appointmentData.nPersona,
          displayExpr: 'cNombre',
          valueExpr: 'nPersona',
          readOnly: (data.appointmentData.nCita) ? true : false,
          searchEnabled: true
      },
      validationRules: [{
        type: 'required',
        message: 'Persona es Requerida',
      }]
    }, {
      label: {
        text: 'Inicio',
      },
      dataField: 'startDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
        onValueChanged(args) {
          startDate = args.value;
        },
      },
      validationRules: [{
        type: 'required',
        message: 'Fecha de Inicio Requerida',
      }]
    }, {
      label: {
        text: 'Fin',
      },
      name: 'endDate',
      dataField: 'endDate',
      editorType: 'dxDateBox',
      editorOptions: {
        width: '100%',
        type: 'datetime',
        onValueChanged(args) {
          endDate = args.value;
        },
      },
      validationRules: [{
        type: 'required',
        message: 'Fecha de Fin requerido',
      }]
    },
    {
      label: {
        text: 'Observacion',
      },
      colSpan: 2,
      name: 'cObservacion',
      editorType: 'dxTextArea',
      editorOptions: {
        value: data.appointmentData.cObservacion,
        onValueChanged(args) {
          form.updateData('cObservacion', args.value);
        },
      },

    }
    ]);

    console.log("form: ",form);
  }

  onAppointmentUpdated(e) {
    console.log("ec: ", e);
  }

  getPersonaById(id) {
    return Query(this.personas).filter(['nPersona', '=', id]).toArray()[0];
  }

  today() {
    this.currentDate = new Date();
  }
}
