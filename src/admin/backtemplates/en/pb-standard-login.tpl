[content]
<div class="container py-4">

    <div class="row g-4 align-items-start">

        <!-- Demo-User Button -->
        <div id="demouser-container" class="col-12 col-lg-4">
             <img src="/image/pbc-backend-ai.jpg" alt="Placeholder - AI image " class="img-fluid mt-2 mb-2"/>
        </div>
        <div class="col-1 col-lg-2"></div>

        <!-- Loginform -->
        <div class="col-12 col-lg-4">
            <form action="{SELF}" method="post">

                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        class="form-control"
                        placeholder="Username"
                        required
                        autofocus>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>

                    <div class="input-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="form-control"
                            placeholder="Enter password"
                            required>

                        <button class="btn btn-outline-secondary" type="button" id="togglePassword" title="Make password visible">
                            <i class="{PBCICON_VISUAL_YES}" id="toggleIcon" ></i>
                        </button>
                    </div>
                </div>

                <button class="btn btn-primary w-100" type="submit">
                    Log in
                </button>

            </form>
        </div>

    </div>

</div>



<script>
    const generalIcons = JSON.parse(document.body.dataset.pbconfdata).general_iconset;

    const password = document.getElementById("password");
    const button = document.getElementById("togglePassword");
    const icon = document.getElementById("toggleIcon");

    function addClasses(el, classString) {
        if (!classString)
            return;
        classString.split(/\s+/).forEach(cls => {
            if (cls)
                el.classList.add(cls);
        });
    }

    function removeClasses(el, classString) {
        if (!classString)
            return;
        classString.split(/\s+/).forEach(cls => {
            if (cls)
                el.classList.remove(cls);
        });
    }


    let visible = false;

    // Toggle-Funktion (aufrufen, wenn der Button gedrückt wird)
    function toggleVisual() {
        if (visible) {
            removeClasses(icon, generalIcons.visual_no);
            addClasses(icon, generalIcons.visual_yes);
            password.type = "password";
            button.title = "Passwort lesbar machen";
        } else {
            removeClasses(icon, generalIcons.visual_yes);
            addClasses(icon, generalIcons.visual_no);
            password.type = "text";
            button.title = "Passwort maskieren";
        }
        visible = !visible;
    }

    document.getElementById('togglePassword')?.addEventListener('click', toggleVisual);


</script>