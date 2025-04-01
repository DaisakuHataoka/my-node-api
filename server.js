const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const API_BASE = "https://www.googleapis.com/tagmanager/v2";

app.get("/api/gtm-versions", async (req, res) => {
    const { accountId, containerId, accessToken } = req.query;

    if (!accountId || !containerId || !accessToken) {
        return res.status(400).json({ error: "アカウントID、コンテナID、アクセストークンが必要です。" });
    }

    try {
        const response = await axios.get(`${API_BASE}/accounts/${accountId}/containers/${containerId}/versions`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        res.json(response.data);
    } catch (error) {
        console.error("GTMバージョン取得エラー:", error);
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
