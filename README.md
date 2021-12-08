# 关于 客户端的一些说明

##  页面
- 首页
- 订单详情页
- 下单确认
- 添加乘车人
- 班次列表页
- 站点选择页
- 起始城市选择
- 我的订单列表


## 项目中使用到的一些第三方的类库

-  antd mobile  https://mobile.ant.design/zh
- dayjs   https://day.js.org/
- redux react-redux 


## 在我们的项目中使用 post-css-px-viewport 
- 第一步  使用 npm run eject 暴露我们的webpack的config文件
- 第二步  安装 post-css-px-viewport  
```
 yarn add postcss-px-to-viewport
 yarn add postcss-loader 
```
- 第三步 在根目录的config/webpack.config.js当中 添加以下内容

```

          require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            // 以下是新增的内容 
            require('postcss-px-to-viewport')({
              viewportWidth: 750, // (Number) 转换的基础参考比例(设计稿的宽度)
              unitPrecision: 3, // (Number) 转换之后保留多少位小数
              viewportUnit: "vw", // (String) 转换之后的单位
              selectorBlackList: [], // (Array) 哪一些指定的选择器不进行转换
              minPixelValue: 1, // (Number) 最小开始转换的像素值
              mediaQuery: false // (Boolean) 是否允许在媒体查询中使用转换
            }),
            // 以上是新增的内容
            postcssNormalize(),


```


