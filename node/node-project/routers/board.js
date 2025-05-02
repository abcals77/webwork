const express = require("express");
const router = express.Router();
const query = require("../mysql")

router.get("", async(req,res)=>{
  const result = await query("board", "selectList", null);
  res.send(result);
});


// req.body req.params req.query req.file
router.post("", async (req, res) =>{
  const result = await query("board", "insertInfo", req.body)
  res.send(result)
});


// 단건 조회
router.get("/:id", async (req,res)=>{
  const id = req.params.id
  const result = await query("board", "selectById", id);
  res.send(result);
});

// 수정
router.put("/:id", async (req,res)=>{
  const id = req.params.id 
  const result = await query("board", "updateInfo", [req.body, id])
  res.send(result)
});

// 삭제
router.delete("/:id", async (req,res)=>{
  const id = req.params.id
  const result = await query("board", "deleteInfo", id)
  res.send(result)
});

module.exports = router;