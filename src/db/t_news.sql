/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 50621
 Source Host           : 114.112.34.242:3310
 Source Schema         : 测试

 Target Server Type    : MySQL
 Target Server Version : 50621
 File Encoding         : 65001

 Date: 13/12/2019 13:49:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_news
-- ----------------------------
DROP TABLE IF EXISTS `t_news`;
CREATE TABLE `t_news`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `news` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '资讯内容',
  `url` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '公众号文章url',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '资讯表' ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_news
-- ----------------------------
INSERT INTO `t_news` VALUES (1, '【院长谈DRGs】后付费时代，大数据DRGs在医院精细化运营管理中如何运用？', 'https://mp.weixin.qq.com/s/Nv-ei6XM4J6s8TBlONO1gA', '2019-09-07 19:56:11', '2019-09-07 19:56:11');
INSERT INTO `t_news` VALUES (2, '深度调研全国近500家医院，推行DRG，压力最大的是病案科', 'https://mp.weixin.qq.com/s/vbKdhWb8lQM03q8N0_5z6A', '2019-09-07 19:56:11', '2019-09-07 19:56:11');
INSERT INTO `t_news` VALUES (3, '医务人员做科普纳入其绩效考核，将涨工资', 'https://mp.weixin.qq.com/s/VycNcbqw97iDTwwOsmXJ1w', '2019-09-07 19:56:11', '2019-09-07 19:56:11');
INSERT INTO `t_news` VALUES (4, '美国医疗支付混乱了40年，我们还能学什么？', 'https://mp.weixin.qq.com/s/vmeWTRSnSvdD-5Q9OXNjzQ', '2019-09-07 19:56:11', '2019-09-07 19:56:11');
INSERT INTO `t_news` VALUES (5, '【直击30城】他调研黑龙江省1000家医院，艰难撰写DRG数据报告，找到了提升病案数据质量的诀窍', 'https://mp.weixin.qq.com/s/OzNiAAfNnxqurvQUCYOz1A', '2019-09-07 19:56:11', '2019-09-07 19:56:11');
INSERT INTO `t_news` VALUES (6, '金华市推行DRG支付，减轻群众近亿元费用，病案科功不可没	', 'https://mp.weixin.qq.com/s/Wd49yqXq8J00lHK3Q1pGGQ', '2019-09-07 19:56:11', '2019-09-07 19:56:11');
INSERT INTO `t_news` VALUES (7, '专家谈绩效|全国三级公立医院绩效考核迫在眉睫，医院如何上报数据？', 'https://mp.weixin.qq.com/s/mkrlXnkoYd1Tb4jgWP3Bww', '2019-09-07 19:56:11', '2019-09-07 19:56:11');
INSERT INTO `t_news` VALUES (8, '医院管理应用案例分析（一）：病案首页数据质量对医保基金支付的影响', 'https://mp.weixin.qq.com/s/rI2a5ej9gb-lW4fEK6q3XA', '2019-09-07 19:56:11', '2019-09-07 19:56:11');
INSERT INTO `t_news` VALUES (9, '省时又省钱！用好DRG，医院就赚了', 'https://mp.weixin.qq.com/s/xNry8OSNVJiU5iCWljrxVg', '2019-09-07 19:56:11', '2019-09-07 19:56:11');
INSERT INTO `t_news` VALUES (10, 'DRG付费改革在即，医院需尽早积极应对', 'https://mp.weixin.qq.com/s/4L9v-pgK5_7TJ-yhQPSVEg', '2019-09-07 19:56:11', '2019-09-07 19:56:11');

SET FOREIGN_KEY_CHECKS = 1;
