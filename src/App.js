import React, { Component } from "react";
// style css
import "./App.css";

// service
import { PersonaService } from "./services/PersonaService";
// primereact
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";

// styles primer react
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      personas: [],
      visible: false,
      persona: {
        idPersona: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        direccion: "",
      },
    };
    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showModal();
        },
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          this.showModalEdit();
        },
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => {
          this.delete();
        },
      },
    ];

    this.personaService = new PersonaService();
    this.savedPersona = this.savedPersona.bind(this);
    this.delete = this.delete.bind(this);

    this.footer = (
      <div>
        <Button
          label="Guardar"
          icon="pi pi-check"
          iconPos="right"
          onClick={this.savedPersona}
        />
      </div>
    );
  }

  savedPersona() {
    this.personaService.savePerson(this.state.persona).then(
      (data) => {
        this.messages.show({
          severity: "success",
          summary: "Procesamiento correcto: ",
          detail: " Se guardó el registro con exito",
        });
        this.setState({ visible: false });
        this.componentDidMount();
      },
      (err) => {
        this.setState({ visible: false });
        this.messages.show({
          severity: "warn",
          summary: "Procesamiento incorrecto: ",
          detail: " Ha ocurrio un error al ingresar registro",
        });
      }
    );
  }

  componentDidMount() {
    this.personaService
      .getAll()
      .then((dara) => this.setState({ personas: dara }));
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  showModalEdit() {
    this.setState({
      visible: true,
    });
  }

  delete() {
    if (window.confirm("Desea eliminar")) {
      this.personaService
        .deletePer(this.state.persona.idPersona)
        .then((data) => {
          this.messages.show({
            severity: "success",
            summary: "Procesamiento correcto: ",
            detail: " Se elimino el registro con exito",
          });
          this.componentDidMount();
        });
    }
  }

  render() {
    return (
      <div className="datatable-responsive-demo">
        <Messages ref={(el) => (this.messages = el)}></Messages>
        <div className="card">
          <Menubar model={this.items}></Menubar>
          <br />
          <Panel header="React Api Rest">
            <DataTable
              value={this.state.personas}
              rows="4"
              paginator={true}
              className="p-datatable-responsive-demo"
              selectionMode="single"
              selection={this.state.persona}
              onSelectionChange={
                (e) => this.setState({ persona: e.value })
                // console.log(e.value)
              }
              selectionMode="single"
            >
              <Column field="idPersona" header="ID"></Column>
              <Column field="nombres" header="Nombres"></Column>
              <Column field="apellidos" header="Apellidos"></Column>
              <Column field="telefono" header="Telefono"></Column>
              <Column field="direccion" header="Dirección"></Column>
            </DataTable>
          </Panel>
        </div>
        {/* formulario para nuevo registro */}
        <Dialog
          header="Agregar"
          visible={this.state.visible}
          style={{ width: "500px" }}
          onHide={() => this.setState({ visible: false })}
          footer={this.footer}
        >
          <br />
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="id"
              value={this.state.persona.idPersona}
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.idPersona = val;

                  return { persona };
                });
              }}
            />
            <label htmlFor="id">Identificador</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="in"
              value={this.state.persona.nombres}
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.nombres = val;

                  return { persona };
                });
              }}
            />
            <label htmlFor="in">Nombres</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="apellido"
              value={this.state.persona.apellidos}
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.apellidos = val;

                  return { persona };
                });
              }}
            />
            <label htmlFor="apellidon">Apellidos</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="direccion"
              value={this.state.persona.direccion}
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.direccion = val;

                  return { persona };
                });
              }}
            />
            <label htmlFor="direccion">Dirección</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              style={{ width: "100%" }}
              id="telefono"
              value={this.state.persona.telefono}
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.telefono = val;

                  return { persona };
                });
              }}
            />
            <label htmlFor="telefono">Telefono</label>
          </span>
        </Dialog>
      </div>
    );
  }
}
