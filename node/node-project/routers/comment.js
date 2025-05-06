const express = require("express");
const router = express.Router();
const query = require("../mysql")


// board.id를 받아 해당하는 댓글만 리스트 조회
router.get("/:bid", async (req, res) => {
  try {
    const bid = req.params.bid;
    const result = await query("comment", "selectList", [bid]);
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

// req.body req.params req.query req.file
router.post("", async (req, res) =>{
  const result = await query("comment", "insertInfo", req.body)
  res.send(result)
});


// 수정
router.put("/:id", async (req,res)=>{
  const id = req.params.id 
  const result = await query("comment", "updateInfo", [req.body, id])
  res.send(result)
});

// 삭제
router.delete("/:id", async (req,res)=>{
  const id = req.params.id
  const result = await query("comment", "deleteInfo", id)
  res.send(result)
});

module.exports = router;