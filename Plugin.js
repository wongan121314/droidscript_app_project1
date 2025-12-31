app.CreateborderStyle = function () {
    return new _borderStyle();
}

function _borderStyle() {

    this.GetVersion = function () { return "1.2"; }

    this.SetBorder = function (
        component,
        Radius = 0,
        Elevation = 0,
        StrokeWidthX = 0,
        StrokeWidthY = 0,
        StrokeClr = "#000000",
        BgClr = "#ffffff",
        mL = 0, mT = 0, mR = 0, mB = 0
    ) {

        // === REAL MARGIN WRAPPER (fix sticking issue) ===
        var marginWrap = app.CreateLayout("Linear", "FillX");
        marginWrap.SetBackColor("#00000000");
        marginWrap.SetMargins(mL, mT, mR, mB);

        // === OUTER BORDER CARD ===
        var outer = app.CreateLayout("Card");
        outer.SetBackColor(StrokeClr);
        outer.SetCornerRadius(Radius);
        try { outer.SetElevation(Elevation); } catch (e) {}

        // === CENTERER FOR STROKE ===
        var centerer = app.CreateLayout("Linear", "FillXY,Center,VCenter");
        centerer.SetBackColor("#00000000");
        centerer.SetMargins(StrokeWidthX, StrokeWidthY, StrokeWidthX, StrokeWidthY);

        // === INNER BACKGROUND CARD ===
        var inner = app.CreateLayout("Card");
        var innerR = Radius - Math.max(StrokeWidthX, StrokeWidthY);
        if (innerR < 0) innerR = 0;
        inner.SetBackColor(BgClr);
        inner.SetCornerRadius(innerR);

        // === CONTENT HOLDER ===
        var content = app.CreateLayout("Linear", "FillXY,Center,VCenter");
        content.SetBackColor("#00000000");

        if (component) {
            try { component.SetBackColor(BgClr); } catch (e) {}
            content.AddChild(component);
        }

        inner.AddChild(content);
        centerer.AddChild(inner);
        outer.AddChild(centerer);
        marginWrap.AddChild(outer);

        // Expose content & outer card
        marginWrap.Box = outer;
        marginWrap.Content = content;

        return marginWrap;
    }
}