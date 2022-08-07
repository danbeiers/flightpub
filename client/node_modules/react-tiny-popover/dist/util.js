"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNudgedPopoverRect = exports.getNewPopoverRect = exports.popoverRectForPosition = exports.getBoundingRectNeglectingPositionalTransform = exports.createContainer = exports.targetPositionHasChanged = exports.popoverStatesAreEqual = exports.rectsAreEqual = exports.arrayUnique = exports.Constants = void 0;
exports.Constants = {
    POPOVER_CONTAINER_CLASS_NAME: 'react-tiny-popover-container',
    DEFAULT_ALIGN: 'center',
    OBSERVER_THRESHOLDS: Array(1000)
        .fill(null)
        .map(function (_, i) { return i / 1000; })
        .reverse(),
    DEFAULT_POSITIONS: ['top', 'left', 'right', 'bottom'],
    EMPTY_CLIENT_RECT: {
        top: 0,
        left: 0,
        bottom: 0,
        height: 0,
        right: 0,
        width: 0,
    },
};
var arrayUnique = function (array) {
    return array.filter(function (value, index, self) { return self.indexOf(value) === index; });
};
exports.arrayUnique = arrayUnique;
var rectsAreEqual = function (rectA, rectB) {
    return rectA === rectB ||
        ((rectA === null || rectA === void 0 ? void 0 : rectA.bottom) === (rectB === null || rectB === void 0 ? void 0 : rectB.bottom) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.height) === (rectB === null || rectB === void 0 ? void 0 : rectB.height) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.left) === (rectB === null || rectB === void 0 ? void 0 : rectB.left) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.right) === (rectB === null || rectB === void 0 ? void 0 : rectB.right) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.top) === (rectB === null || rectB === void 0 ? void 0 : rectB.top) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.width) === (rectB === null || rectB === void 0 ? void 0 : rectB.width));
};
exports.rectsAreEqual = rectsAreEqual;
var popoverStatesAreEqual = function (stateA, stateB) {
    return stateA === stateB ||
        ((stateA === null || stateA === void 0 ? void 0 : stateA.align) === (stateB === null || stateB === void 0 ? void 0 : stateB.align) &&
            (stateA === null || stateA === void 0 ? void 0 : stateA.nudgedLeft) === (stateB === null || stateB === void 0 ? void 0 : stateB.nudgedLeft) &&
            (stateA === null || stateA === void 0 ? void 0 : stateA.nudgedTop) === (stateB === null || stateB === void 0 ? void 0 : stateB.nudgedTop) &&
            stateA.padding === stateB.padding &&
            exports.rectsAreEqual(stateA === null || stateA === void 0 ? void 0 : stateA.popoverRect, stateB === null || stateB === void 0 ? void 0 : stateB.popoverRect) &&
            exports.rectsAreEqual(stateA === null || stateA === void 0 ? void 0 : stateA.childRect, stateB === null || stateB === void 0 ? void 0 : stateB.childRect) &&
            (stateA === null || stateA === void 0 ? void 0 : stateA.position) === (stateB === null || stateB === void 0 ? void 0 : stateB.position));
};
exports.popoverStatesAreEqual = popoverStatesAreEqual;
var targetPositionHasChanged = function (oldRect, newRect) {
    return oldRect === undefined ||
        oldRect.left !== newRect.left ||
        oldRect.top !== newRect.top ||
        oldRect.width !== newRect.width ||
        oldRect.height !== newRect.height;
};
exports.targetPositionHasChanged = targetPositionHasChanged;
var createContainer = function (containerStyle, containerClassName) {
    var container = window.document.createElement('div');
    if (containerClassName)
        container.className = containerClassName;
    Object.assign(container.style, containerStyle);
    return container;
};
exports.createContainer = createContainer;
var getBoundingRectNeglectingPositionalTransform = function (element) {
    if (element == null)
        return undefined;
    var el = element;
    var top = 0;
    var left = 0;
    do {
        top += el.offsetTop;
        left += el.offsetLeft;
        el = el.offsetParent;
    } while (el != null);
    var scrollTop = 0;
    var scrollLeft = 0;
    el = element;
    do {
        scrollTop += el.scrollTop;
        scrollLeft += el.scrollLeft;
        el = el.parentElement;
    } while (el != null);
    top -= scrollTop;
    left -= scrollLeft;
    var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
    return { top: top, left: left, width: width, height: height, bottom: top + height, right: left + width };
};
exports.getBoundingRectNeglectingPositionalTransform = getBoundingRectNeglectingPositionalTransform;
var popoverRectForPosition = function (position, childRect, popoverRect, padding, align) {
    var targetMidX = childRect.left + childRect.width / 2;
    var targetMidY = childRect.top + childRect.height / 2;
    var width = popoverRect.width, height = popoverRect.height;
    var top;
    var left;
    switch (position) {
        case 'left':
            top = targetMidY - height / 2;
            left = childRect.left - padding - width;
            if (align === 'start') {
                top = childRect.top;
            }
            if (align === 'end') {
                top = childRect.bottom - height;
            }
            break;
        case 'bottom':
            top = childRect.bottom + padding;
            left = targetMidX - width / 2;
            if (align === 'start') {
                left = childRect.left;
            }
            if (align === 'end') {
                left = childRect.right - width;
            }
            break;
        case 'right':
            top = targetMidY - height / 2;
            left = childRect.right + padding;
            if (align === 'start') {
                top = childRect.top;
            }
            if (align === 'end') {
                top = childRect.bottom - height;
            }
            break;
        default:
            top = childRect.top - height - padding;
            left = targetMidX - width / 2;
            if (align === 'start') {
                left = childRect.left;
            }
            if (align === 'end') {
                left = childRect.right - width;
            }
            break;
    }
    return { top: top, left: left, width: width, height: height, right: left + width, bottom: top + height };
};
exports.popoverRectForPosition = popoverRectForPosition;
var getNewPopoverRect = function (_a, boundaryInset) {
    var position = _a.position, align = _a.align, childRect = _a.childRect, popoverRect = _a.popoverRect, boundaryRect = _a.boundaryRect, padding = _a.padding, reposition = _a.reposition;
    var rect = exports.popoverRectForPosition(position, childRect, popoverRect, padding, align);
    var boundaryViolation = reposition &&
        ((position === 'top' && rect.top < boundaryRect.top + boundaryInset) ||
            (position === 'left' && rect.left < boundaryRect.left + boundaryInset) ||
            (position === 'right' && rect.right > boundaryRect.right - boundaryInset) ||
            (position === 'bottom' && rect.bottom > boundaryRect.bottom - boundaryInset));
    return {
        rect: rect,
        boundaryViolation: boundaryViolation,
    };
};
exports.getNewPopoverRect = getNewPopoverRect;
var getNudgedPopoverRect = function (popoverRect, boundaryRect, boundaryInset) {
    var topBoundary = boundaryRect.top + boundaryInset;
    var leftBoundary = boundaryRect.left + boundaryInset;
    var rightBoundary = boundaryRect.right - boundaryInset;
    var bottomBoundary = boundaryRect.bottom - boundaryInset;
    var top = popoverRect.top < topBoundary ? topBoundary : popoverRect.top;
    top = top + popoverRect.height > bottomBoundary ? bottomBoundary - popoverRect.height : top;
    var left = popoverRect.left < leftBoundary ? leftBoundary : popoverRect.left;
    left = left + popoverRect.width > rightBoundary ? rightBoundary - popoverRect.width : left;
    return {
        top: top,
        left: left,
        width: popoverRect.width,
        height: popoverRect.height,
        right: left + popoverRect.width,
        bottom: top + popoverRect.height,
    };
};
exports.getNudgedPopoverRect = getNudgedPopoverRect;
//# sourceMappingURL=util.js.map