import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { api } from "../../utils";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { toast, ToastContainer } from "react-toastify";

const styles = (theme) => ({});

function CombatModal({
  data,
  classes,
  onSubmit,
  operation,
  character,
  handleClose,
  fullCharacter
}) {
  const [updatedCharacter, setUpdatedCharacter] = useState(fullCharacter);

  // Definir dados do cabeçalho da tabela
  const columns = [
    { id: "weapon", label: "ARMA", minWidth: 150 },
    { id: "type", label: "TIPO", minWidth: 100 },
    { id: "damage", label: "DANO", minWidth: 100 },
    { id: "current_load", label: "CARGA ATUAL", minWidth: 70 },
    { id: "total_load", label: "CARGA MÁXIMA", minWidth: 70 },
  ];

  // Tipo de armas
  const [type, setType] = React.useState("");
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [combat, setCombat] = useState({
    weapon: "",
    type: "",
    damage: "",
    current_load: "",
    total_load: "",
    character_id: character,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setCombat({
      weapon: data.weapon,
      type: data.type,
      damage: data.damage,
      current_load: data.current_load,
      total_load: data.total_load,
      character_id: character,
    });
  }, [data]);

  const resetState = () => {
    return setCombat({
      weapon: "",
      type: "",
      damage: "",
      current_load: "",
      total_load: "",
      character_id: character,
    });
  };

  const submit = () => {
    if (!combat.weapon) {
      return;
    }

    // Se a operação for criar
    if (operation === "create") {
      api
        .post("/combat", combat)
        .then(async () => {
          const responseID = await api.get(`/combat/`);

          let newIds = [];
          responseID.data.forEach((val) => {
            newIds.push(val.id);
          });

          updatedCharacter.combat.push({
            combat_id: Math.max.apply(null, newIds),
            combat,
          });
          setUpdatedCharacter(updatedCharacter);

          // Callback
          onSubmit(updatedCharacter);

          // Close modal
          handleClose();

          // Limpa aa informações
          resetState();
        })
        .catch(() => {
          toast.error("Erro ao criar o item!");
        });
    } else if (operation === "edit") {
      // Se a operação for editar
      api
        .put(`/combat/${data.id}`, combat)
        .then(() => {
          // Descobre o ID no inventario que vai ser atualizado e modifica essa posição na lista
          const index = updatedCharacter.combat.findIndex(
            (obj) => obj.combat_id == data.id
          );

          updatedCharacter.combat[index].combat = combat;
          setUpdatedCharacter(updatedCharacter);

          // Callback para atualizar o personagem no componente pai
          onSubmit(updatedCharacter);

          // Close modal
          handleClose();

          resetState();
        })
        .catch((err) => {
          toast.error("Erro ao editar o item!");
        });
    }
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={true} onClose={handleClose}>
      <DialogTitle>
        {" "}
        {operation === "create" ? "Adicionar um novo item" : "Editar item"}
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 500 }}
            aria-label="custom pagination table"
            stickyHeader
          >
            {/* Cabeçalho da tabela */}
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                {/* Descrição da arma */}
                <TableCell component="th" scope="row">
                  <TextField
                    id="filled-basic"
                    label="Descrição"
                    variant="standard"
                    autoComplete="off"
                    defaultValue={data ? data.weapon : ""}
                    onChange={({ target }) => {
                      const value = target.value;

                      setCombat((prevState) => ({
                        ...prevState,
                        weapon: value,
                      }));
                    }}
                  />
                </TableCell>

                {/* Tipo */}
                <TableCell style={{ minWidth: 180 }} align="left">
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-label">
                      Tipo da arma
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={type}
                      label="Tipo de arma"
                      defaultValue={data ? data.type : ""}
                      onChange={({ target }) => {
                        const value = target.value;

                        setCombat((prevState) => ({
                          ...prevState,
                          type: value,
                        }));
                      }}
                    >
                      <MenuItem value="Balistico">Balístico</MenuItem>
                      <MenuItem value="Fisico">Físico</MenuItem>
                      <MenuItem value="Fogo">Fogo</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

                {/* Dano */}
                <TableCell style={{ minWidth: 100 }} align="right">
                  <TextField
                    id="filled-basic"
                    label="Dano"
                    variant="standard"
                    autoComplete="off"
                    defaultValue={data ? data.damage : ""}
                    onChange={({ target }) => {
                      const value = target.value;

                      setCombat((prevState) => ({
                        ...prevState,
                        damage: value,
                      }));
                    }}
                  />
                </TableCell>

                {/* Carga atual */}
                <TableCell style={{ minWidth: 70 }} align="right">
                  <TextField
                    type="number"
                    id="filled-basic"
                    label="Carga Atual"
                    variant="standard"
                    autoComplete="off"
                    defaultValue={data ? data.current_load : ""}
                    onChange={({ target }) => {
                      const value = target.value;

                      setCombat((prevState) => ({
                        ...prevState,
                        current_load: value,
                      }));
                    }}
                  />
                </TableCell>

                {/* Capacidade */}
                <TableCell style={{ minWidth: 70 }} align="right">
                  <TextField
                    type="number"
                    id="filled-basic"
                    label="Carga Maxima"
                    variant="standard"
                    autoComplete="off"
                    defaultValue={data ? data.total_load : ""}
                    onChange={({ target }) => {
                      const value = target.value;

                      setCombat((prevState) => ({
                        ...prevState,
                        total_load: value,
                      }));
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={submit}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(CombatModal);
