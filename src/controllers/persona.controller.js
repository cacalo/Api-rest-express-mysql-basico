import { getConnection } from "./../database/database";

const getAll = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM Persona WHERE deleted =0");
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const connection = await getConnection();
    console.log(req.params);
    const result = await connection.query(
      "SELECT * FROM Persona WHERE (id= ? ) and (deleted=0)",req.params.id
    );
    if (result.length === 0) return res.json({ message: "Elemento inexistente" });
    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const set = async (req, res) => {
  try {
    if (req.body.apellido === undefined) {
      return res.status(400).json({ message: "Por favor completar apellido" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "INSERT into Persona SET ?",
      req.body
    );
    res.json({ message: "Ítem añadido con éxito", id: result.insertId });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const update = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      //No se debería ejecutar nunca esta línea :/
      return res.status(400).json({ message: "El ID es necesario" });
    }
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE Persona SET ? WHERE id = ?",[req.body,req.params.id]);
    res.json({ message: "Ítem modificado con éxito", id: result.insertId });  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const del = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE Persona SET ? WHERE (id = ?) and (deleted=0)",[{deleted:1},req.params.id]);
    if(result.affectedRows === 0){
      return res.json({ message: "No se encontró un registro con ese ID" });
    }
    res.json({ message: "Ítem eliminado"});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const restore = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE Persona SET ? WHERE id = ?",[{deleted:0},req.params.id]);
    if(result.affectedRows === 0){
      return res.json({ message: "No se encontró un registro con ese ID" });
    }
    res.json({ message: "Ítem eliminado"});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};


const BORRADO_DEFINITIVO = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM `pruebas`.`persona` WHERE id = ?",req.params.id
    );
    if(result.affectedRows === 0){
      return res.json({ message: "No se encontró un registro con ese ID" });
    }
    res.json({ message: "Ítem eliminado"});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getAll,
  getById,
  set,
  del,
  update,
  restore,
  BORRADO_DEFINITIVO
};
