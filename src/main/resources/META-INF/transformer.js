var ASMAPI = Java.type("net.minecraftforge.coremod.api.ASMAPI");
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "ForgeZetaEventBus_<init>": {
            "target": {
                "type": "METHOD",
                "class": "org/violetmoon/zetaimplforge/event/ForgeZetaEventBus",
                "methodName": "<init>",
                "methodDesc": "(Ljava/lang/Class;Ljava/lang/Class;Lorg/apache/logging/log4j/Logger;Lnet/minecraftforge/eventbus/api/IEventBus;Ljava/lang/Class;Lorg/violetmoon/zeta/Zeta;Lorg/violetmoon/zetaimplforge/event/ForgeEventsRemapper;)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.PUTFIELD && node.owner.equals("org/violetmoon/zetaimplforge/event/ForgeZetaEventBus") && node.name.equals(ASMAPI.mapField("convertedHandlers")) && node.desc.equals("Ljava/util/Map;")) {
                        mn.instructions.insertBefore(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "io/github/zekerzhayard/aioobe_forgezetaeventbus/ConcurrentHashMapWithNullKey", "create", "(Ljava/util/Map;)Ljava/util/Map;", false));
                    }
                }
                return mn;
            }
        }
    }
}
