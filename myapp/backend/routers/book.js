const express = require("express");
const router = express.Router();
const query = require("../mysql")

router.get("", async (req, res) => {
  const page = parseInt(req.query.page) || 1;   // 현재 페이지 (기본: 1)
  const count = parseInt(req.query.count) || 5; // 페이지당 항목 수 (기본: 5)
  const offset = (page - 1) * count;

  // 책 목록 + 전체 개수 쿼리 실행
  const list = await query("book", "selectList", [offset, count]);
  const totalResult = await query("book", "selectCount", null);
  const total = totalResult[0].total;

  res.send({
    list,
    total
  });
});

// 단건 조회
router.get("/:id", async (req,res)=>{
  const id = req.params.id
  const result = await query("book", "selectById", id);
  res.send(result);
});

// 등록
router.post("", async (req, res) =>{
  const result = await query("book", "insertInfo", req.body)
  res.send(result)
});

// 삭제
router.delete("/:id", async (req,res)=>{
  const id = req.params.id
  const result = await query("book", "deleteInfo", id);
  res.send(result);
})

// 수정
router.put("/:id", async (req,res)=>{
  const id = req.params.id 
  const result = await query("book", "updateInfo", [req.body, id])
  res.send(result)
});

module.exports = router;