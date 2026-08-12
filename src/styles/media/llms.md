# media

```scss
@mixin mobile {
    @media (max-width: 600px) {
        @content;
    }
}
```

```scss
@mixin tablet {
    @media (max-width: 1024px) {
        @content;
    }
}
```

```scss
@mixin desktop {
    @media (min-width: 1025px) {
        @content;
    }
}
```
