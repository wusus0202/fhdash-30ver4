async function fetchLassData() {
        const device = config[currentSrc];
        try {
            const res = await fetch(`https://pm25.lass-net.org/data/last.php?device_id=${device.id}`);
            const json = await res.json();
            
            // 使用你原始程式碼中成功的「自動抓取第一個物件」邏輯
            if (json?.feeds?.length > 0) {
                const firstObject = json.feeds[0];
                // 抓取第一個 Key (通常就是 Device ID)
                const firstKey = Object.keys(firstObject)[0];
                const d = firstObject[firstKey];
                
                if (d) {
                    updateLassUI(d);
                    document.getElementById('data-status').innerHTML = `● ${device.name} 更新成功`;
                    // 將最新數據暫存在 window 供趨勢圖使用
                    window.lastData = d; 
                }
            }
        } catch (e) { 
            console.error(e);
            document.getElementById('data-status').innerHTML = `● 連線錯誤`; 
        }
    }
