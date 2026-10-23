@echo off
chcp 65001 > nul
title Sərbəst İş Hazırlayan Proqram
echo ======================================================================
echo          SƏRBƏST İŞ HAZIRLAYAN PROQRAM (v1.0)
echo   Azərbaycan Ali Məktəb Standartlarına Uyğun Avtomatlaşdırılmış Sistem
echo ======================================================================
echo.
echo Proqram işə salınır...
echo Brauzeriniz avtomatik açılacaqdır: http://localhost:3000
echo Əgər açılmasa, brauzerinizdə http://localhost:3000 ünvanına daxil olun.
echo Proqramı dayandırmaq üçün bu pəncərəni bağlaya bilərsiniz.
echo.
node server.js
pause

