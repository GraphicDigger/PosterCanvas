
StackBlitzDocs — [https://developer.stackblitz.com/guides/user-guide/what-is-stackblitz]

**Architecture**
    [features/StackBlitzEditor]
        Hooks
            useStackBlitzInit - инициализация vm при загрузке приложения
            useStackBlitzPreview - работа с режимом Preview
            useStackBlitzPreview - работа с режимом Editor
        UI
            StackBlitz
                preview
                editor
    [widgets/componentCanvas] - <StackBlitz preview/> is imported into componentCanvas
    [widget/componentCode] - <StackBlitz editor/> is imported into componentCode.
        _similarly to ScreenCanvas, ScreenCode, but they are not available yet_
    [pages/ditor]
        Importing widgets. The feature is considered in the context of components, so it is imported here [if isComponentCanvasInDesignMode ...]
        

**Problem**
    Виртуальная машина не инициализируется: 
        [StackBlitzEmbed] Ошибка встраивания: Timeout: Unable to establish a connection with the StackBlitz VM
            методы vm не работают - не можем управлять кодом на аккунте stackblitz
            Не сохранется проект в резульате не получаем кодовую базу в режиме preview
    Ссылки на тикеты в github с близкими проблемами
        [https://github.com/stackblitz/core/issues/1955] описывает ситуацию, когда промис от embedProject (или аналогичных методов) может успешно разрешиться (вы получаете объект vm), но сама виртуальная машина внутри iframe еще не полностью готова или уже столкнулась с внутренней ошибкой.
        [https://github.com/stackblitz/sdk/issues/11] Это, по сути, то же самое, что описано в комментарии к #1955, но выделено в отдельный тикет в репозитории SDK. Он прямо говорит, что внутренние ошибки в iframe могут приводить к тому, что промисы SDK не завершаются (не "settle"). Ошибка таймаута, которую вы видите (Timeout: Unable to establish a connection...), является как раз результатом того, что SDK ждет ответа/сигнала от VM (который, вероятно, должен прийти через механизм промисов), но не получает его в течение отведенного времени
        [https://github.com/stackblitz/sdk/pull/12] 


**Goal**
    Загружать кодовую базу из github в Stack Blitz Editor платформы

**Tasks**
    В StackBlitz Preview
        Выделение элементов 
        Выделение инстансов и получение их пропсов 

**Видение и проблема**
    Iframe предпросмотра загружается с другого домена (принадлежащего StackBlitz/WebContainer), localhost не может просто "залезть" внутрь и манипулировать его содержимым напрямую. Единственный способ взаимодействия между вашим приложением и содержимым iframуStackblitz — это использование API window.postMessage.
    Это требует: В вашем приложении (localhost): Отправлять сообщения в iframe (например, "выдели этот элемент", "измени это свойство"). В приложении внутри iframe (ude-test): Написать скрипт, который слушает эти сообщения (window.addEventListener('message', ...)), находит нужные DOM-элементы и применяет изменения ИЛИ отправляет информацию о выделенных элементах обратно вашему приложению.

    Проблема:
    StackBlitz не предоставляет встроенной функции для такого обратного преобразования (визуальное изменение -> изменение исходного кода).
    

    