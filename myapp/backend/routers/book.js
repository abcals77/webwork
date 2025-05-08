const express = require("express");
const router = express.Router();
const query = require("../mysql")

router.get("", async(req,res)=>{
  const result = await query("book", "selectList", null);
  res.send(result);
});


// 단건 조회
router.get("/:id", async (req,res)=>{
  const id = req.params.id
  const result = await query("book", "selectById", id);
  res.send(result);
});

// 삭제
router.delete("/:id", async (req,res)=>{
  const id = req.params.id
  const result = await query("book", "deleteInfo", id);
  res.send(result);
})

module.exports = router;